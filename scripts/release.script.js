const fs = require('fs');
const archiver = require('archiver');
const manifest = require('../manifest.json');

const getFiles = ()=>{
	const unique = (list)=>[...new Set(list)];
	const files = [
		'assets/*.*',
		'manifest.json',
	].concat(manifest.content_scripts.flatMap((content)=>content.js));
	return unique(files);
};

const archive = archiver('zip', { zlib: { level: 9 } });

const finished = fs.createWriteStream(`release-v${manifest.version}.zip`).on('close', ()=>{
	console.log('');
	console.log(archive.pointer() + ' total bytes');
	console.log(`Release Zip created for ${manifest.name} v${manifest.version}`);
});
archive.pipe(finished);

const zip = (file)=>{
	archive.glob(file);
	console.log(`  - ${file}`);
};

console.log('Zipping the following files...');
getFiles().map(zip);
archive.finalize();