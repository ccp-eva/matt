const { PDFDocument, rgb, StandardFonts } = PDFLib;

mdc.ripple.MDCRipple.attachTo(document.getElementById('confirm-btn'));

const button = document.getElementById('confirm-btn');
const checkbox = document.getElementById('confirm-checkbox');
const pDelete = document.getElementById('p-delete');
// const aDownload = document.getElementById('a-download');
const buttonDownload = document.getElementById('button-center-item');
// get and store id
const subjID = new URL(document.location.href).searchParams.get('ID') || 'testID';
const agegroup = new URL(document.location.href).searchParams.get('A') || '1';
const coupon = new URL(document.location.href).searchParams.get('coupon') || 'testcoupon';

const handleChecked = () => {
	button.disabled = !checkbox.checked;
};

document.querySelector('.mdc-checkbox').addEventListener('click', handleChecked);

// function for response logging, creating json file on server
function downloadData(safe, ID) {
	fetch('data/data.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ data: JSON.stringify(safe), fname: ID }),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log('Success:', data);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

const handleConfirmClick = (event) => {
	event.preventDefault();

	pDelete.innerHTML = '<strong>Wir werden Ihre Daten löschen. Danke!</strong>';

	const date = new Date();

	const toSave = {
		// get ID out of URL parameter
		subjID: new URL(document.location.href).searchParams.get('ID'),
		deleteData: true,
		timestamp: date.toISOString(),
		epoch: date.getTime(),
	};
	const toSaveID = `DELETE${subjID}`;
	downloadData([toSave], toSaveID);
};

// add unique coupon code to pdf
async function createCoupon() {
	// Fetch an existing PDF document
	const url = 'coupon.pdf';
	const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

	// Load a PDFDocument from the existing PDF bytes
	const pdfDoc = await PDFDocument.load(existingPdfBytes);

	// Embed the Helvetica font
	const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique);

	// Get the first page of the document
	const pages = pdfDoc.getPages();
	const firstPage = pages[0];

	// Draw a string of text diagonally across the first page
	firstPage.drawText(`${coupon}`, {
		x: 238,
		y: 200,
		size: 25,
		font: helveticaFont,
	});

	// Serialize the PDFDocument to bytes (a Uint8Array)
	const pdfBytes = await pdfDoc.save();

	// Trigger the browser to download the PDF document
	download(pdfBytes, 'MPI_Gutschein.pdf', 'application/pdf');
}
//-----------------------------------------------------

// HIDE URL PARAMETER
// history.replaceState(
//   null,
//   document.querySelector('title').innerText,
//   window.location.pathname,
// );

button.addEventListener('click', handleConfirmClick, {
	capture: false,
	once: true,
});

// define what happens on button click
const handleDownloadClick = () => {
	createCoupon();
};

buttonDownload.addEventListener('click', handleDownloadClick, {
	capture: false,
});
