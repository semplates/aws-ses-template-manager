def decode_mime_part(mime_part):
    charset = mime_part.get_content_charset()
    payload = mime_part.get_payload(decode=True)

    try:
        decoded_payload = payload.decode(charset or 'utf-8', errors='ignore')
    except Exception as e:
        print(f"Error decoding payload: {e}")
        decoded_payload = payload.decode('utf-8', errors='ignore')

    if mime_part.get_content_type() == "text/plain":
        return decoded_payload, 'plain'
    elif mime_part.get_content_type() == "text/html":
        return decoded_payload, 'html'
