var _config = {
	release: {
		options: {
			//bump: false, //default: true
			//file: 'component.json', //default: package.json
			//add: false, //default: true
			//commit: false, //default: true
			//tag: false, //default: true
			//push: false, //default: true
			//pushTags: false, //default: true
			//npm: false, //default: true
			//tagName: 'some-tag-<%= version %>', //default: '<%= version %>'
			//commitMessage: 'New release <%= version %>', //default: 'release <%= version %>'
			//tagMessage: 'tagging version <%= version %>' //default: 'Version <%= version %>'
		}
	}
};

module.exports = function(grunt) {
	grunt.initConfig(_config);
	grunt.loadNpmTasks('grunt-release');
};