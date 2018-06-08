const inquirer = require('inquirer'),
		fs = require('fs'),
		TYPES = fs.readdirSync(`./templates`),
		QUESTIONS = [
			{
				name: 'template-type',
				type: 'list',
				message: 'what do you like to create?\n',
				choices: TYPES
			},
			{
				name: 'component-name',
				type: 'input',
				message: 'Component name:\n',
				validate: function (input) {
					if (/^ui-([a-z\s\-]+)$/.test(input)) return true;
					else return 'component name should start with ui- followed by alpha numeric and hyphens';
				}
			}
		],
		CONFIG = {
			placeholder: 'sample'
		};


function createDirectoryContents (templatePath, name) {
	const filesToCreate = fs.readdirSync(templatePath);

	filesToCreate.forEach(file => {
		const origFilePath = `${templatePath}/${file}`;

		// get stats about the current file
		const stats = fs.statSync(origFilePath);

		if (stats.isFile()) {
			let fileContent = fs.readFileSync(origFilePath, 'utf8'),
				writePath = `./src/framework/components/${name}/${file}`;

			// rename the files and contents within
			writePath = writePath.replace(CONFIG.placeholder, name);
			fileContent = fileContent.replace(new RegExp(CONFIG.placeholder, 'g'), name);

			// write output
			fs.writeFileSync(writePath, fileContent, 'utf8');
		}
	});
}

module.exports = function (callback) {

	inquirer.prompt(QUESTIONS)
	.then(answers => {
		const type = answers['template-type'];
		const componentName = answers['component-name'];
		const templatePath = `./templates/component`;

		fs.mkdirSync(`./src/framework/components/${componentName}`);

		createDirectoryContents(templatePath, componentName);
	});
};
