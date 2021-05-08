import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import rfs from 'rotating-file-stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
	size: '10M', // rotate every 10 MegaBytes written
	interval: '1d', // rotate daily
	compress: 'gzip', // compress rotated files // rotate daily
	path: path.join(__dirname, 'log'),
});

export default accessLogStream;
