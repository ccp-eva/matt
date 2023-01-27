declare module '*.yaml' {
	const content: any;
	export default content;
}

declare module '*.md' {
	const content: string;
	export default content;
}

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

declare module '*.mp3' {
	const content: any;
	export default content;
}

declare module '*.webm' {
	const content: any;
	export default content;
}

declare var data: {
	id: string;
	culture: 'deUrban';
	initialTimestamp: string;
	slideCount: number;
	gender: 'female' | 'male' | 'other';
	birthday: 'string';
	procedure: {
		introduction: {
			duration: number;
		};
		cow?: {
			duration: number;
			response: string;
		};
		pig?: {
			duration: number;
			response: string;
		};
		sheep?: {
			duration: number;
			response: string;
		};
		chicken?: {
			duration: number;
			response: string;
		};
		cat?: {
			duration: number;
			response: string;
		};
		dog?: {
			duration: number;
			response: string;
		};
		rabbit?: {
			duration: number;
			response: string;
		};
		goldfish?: {
			duration: number;
			response: string;
		};
	};
};
