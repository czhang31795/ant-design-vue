#!/usr/bin/env node
if (process.argv[2] === 'mcp') {
  require('../dist/mcp.js');
} else {
  require('../dist/index.js');
}
