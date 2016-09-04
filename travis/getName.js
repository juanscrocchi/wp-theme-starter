#!/usr/bin/env node
require('process');
var name = require('../project.config.js').name;
process.stdout.write(name);
process.exit();