(function(){
	const inject = (CodeBlock)=>{
		const source = CodeBlock.firstChild.textContent;

		const DiagramCanvas = document.createElement('canvas');
		nomnoml.draw(DiagramCanvas, source);

		const Link = document.createElement('a');
		Link.target = '_blank';
		Link.href = `http://www.nomnoml.com/#view/${encodeURI(source)}`;

		Link.appendChild(DiagramCanvas);
		CodeBlock.parentNode.insertBefore(Link, CodeBlock);
	};

	const CodeBlocks = Array.from(document.querySelectorAll('pre[lang="nomnoml"]'));

	CodeBlocks.map(inject);
})();
