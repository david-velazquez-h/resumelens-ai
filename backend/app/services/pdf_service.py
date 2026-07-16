from pypdf import PdfReader
from io import BytesIO


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Extracts raw text from a PDF file provided as bytes.
    Raises ValueError if no extractable text is found (e.g. a scanned
    image-only PDF with no text layer).
    """
    reader = PdfReader(BytesIO(file_bytes))

    text_parts = []
    for page in reader.pages:
        text_parts.append(page.extract_text() or "")

    full_text = "\n".join(text_parts).strip()

    if not full_text:
        raise ValueError(
            "No extractable text found in this PDF. "
            "It may be a scanned image without a text layer."
        )

    return full_text