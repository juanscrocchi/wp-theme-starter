#!/usr/bin/env node
require('process');
var version = require('../project.config.js').version;
process.stdout.write(version);
process.exit();