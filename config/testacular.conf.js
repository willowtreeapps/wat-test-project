basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'js/lib/underscore-min.js',
  'js/lib/angular.js',
  'js/lib/angular-resource.js',
  'test/lib/angular/angular-mocks.js',
  'js/app.js',
  'js/controllers/*.js',
  'test/unit/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};