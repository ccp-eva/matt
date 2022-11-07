// if you plan to use md/svg files for js-only projects you dont need this file

// allow md files to be imported as modules
declare module '*.md' {
	const content: string;
	export default content;
}

// allow svg files to be imported as modules
declare module '*.svg' {
	const content: any;
	export default content;
}

declare module '*.png' {
	const content: any;
	export default content;
}

declare module '*.gif' {
	const content: any;
	export default content;
}
