const Generator = require('yeoman-generator')

module.exports = class App extends Generator {
    constructor(args, opts) {
        super(args, opts)
    }

    // Your initialization methods (checking current project state, getting configs, etc)
    initializing() {
        this.log('Welcome to react generator! Please answer some questions:')
    }

    // Where you prompt users for options (where you'd call this.prompt())
    prompting() {
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: this.appname
        }, {
            type: 'input',
            name: 'username',
            message: 'Your full name'
        }, {
            type: 'input',
            name: 'email',
            message: 'Your email'
        }]).then(ans => {
            const { name, username, email } = ans
            this.projectName = name.split(' ').join('-')
            this.username = username.toLowerCase().split(' ').join('') || 'yeoman'
            this.email = email || 'user@didnt.set'
        })
    }

    // Saving configurations and configure the project (creating .editorconfig files and other metadata files)
    configuring() {
        // creates .yo-rc config file
        this.config.save()
    }

    // If the method name doesn't match a priority, it will be pushed to this group.
    default() {

    }

    _copyAllFiles() {
        return this.fs.copy(
            [
                this.templatePath('**'),
                this.templatePath('.*')
            ],
            this.destinationPath()
        )
    }

    _copyTemplates({ title }) {
        return this.fs.copyTpl(
            [
                this.templatePath('index.html'),
                this.templatePath('package.json')
            ],
            this.destinationPath(),
            { 
                title, 
                projectName: this.projectName, 
                author: this.username,
                email: this.email
            }
        )
    }

    // Where you write the generator specific files (routes, controllers, etc)
    writing() {
        const title = this.projectName.split('-').map(w => w.toLowerCase()).join(' ')

        this._copyAllFiles()
        this._copyTemplates({ title })
    }

    // Where conflicts are handled (used internally)
    conflicts() {

    }

    // Where installations are run (npm, bower)
    install() {
        this.log('Installing npm packages..')
        this.npmInstall()
    }

    // Called last, cleanup, say good bye, etc
    end() {
        this.log('Installation finished.')
        this.log('You can run `npm run build` to build your project or `npm start` to start development server`')
        this.log('Enjoy!')
    }
}