import { useState } from 'react';
import './MusicGenerator.css'; // Reuse the same styles
import { decryptMIDIToText } from '../utils/musicGenerator';

const MIDIDecryptor = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.name.toLowerCase().endsWith('.mid') || file.name.toLowerCase().endsWith('.midi')) {
                setSelectedFile(file);
                setError('');
                setResult(null);
            } else {
                setError('Please select a valid MIDI file (.mid or .midi)');
                setSelectedFile(null);
            }
        }
    };

    const handleDecrypt = async () => {
        if (!selectedFile) {
            setError('Please select a MIDI file first');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            // Read the file as ArrayBuffer
            const arrayBuffer = await selectedFile.arrayBuffer();
            
            // Decrypt the MIDI file
            const decryptionResult = decryptMIDIToText(arrayBuffer);
            
            if (decryptionResult.success) {
                setResult({
                    originalText: decryptionResult.originalText,
                    notes: decryptionResult.notes,
                    noteCount: decryptionResult.noteCount,
                    fileName: selectedFile.name
                });
            } else {
                setError('Failed to decrypt MIDI file: ' + decryptionResult.error);
            }
        } catch (error) {
            setError('Error reading file: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSelectedFile(null);
        setResult(null);
        setError('');
        // Reset file input
        const fileInput = document.getElementById('midiFile');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="doodle"></div>
                <h1>🔓 MIDI Decryptor</h1>
                <p>Upload a MIDI file to reveal the original text that created it</p>
            </div>

            <div className="form-group">
                <label htmlFor="midiFile">📁 Select MIDI File:</label>
                <input 
                    type="file" 
                    id="midiFile"
                    accept=".mid,.midi"
                    onChange={handleFileSelect}
                    className="file-input"
                />
                {selectedFile && (
                    <div className="file-info">
                        <p>✅ Selected: <strong>{selectedFile.name}</strong></p>
                        <p>📊 Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
                    </div>
                )}
            </div>

            <div className="button-group">
                <button 
                    className="btn-primary" 
                    onClick={handleDecrypt}
                    disabled={!selectedFile || loading}
                >
                    🔓 Decrypt MIDI
                </button>
                <button 
                    className="btn-secondary" 
                    onClick={handleReset}
                    disabled={loading}
                >
                    🔄 Reset
                </button>
            </div>

            {loading && (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Decrypting your MIDI file...</p>
                </div>
            )}

            {error && (
                <div className="error">{error}</div>
            )}

            {result && (
                <div className="result">
                    <div className="melody-info">
                        <h3>🎉 Decryption Successful!</h3>
                        <p><strong>📁 File:</strong> {result.fileName}</p>
                        <p><strong>🔤 Original Text:</strong> "<span className="original-text">{result.originalText}</span>"</p>
                        <p><strong>🎵 Notes Found:</strong> {result.noteCount} musical notes</p>
                        
                        {result.notes && result.notes.length > 0 && (
                            <div className="note-list">
                                <h4>🎼 Note Sequence:</h4>
                                {result.notes.map((note, index) => (
                                    <div key={index} className="note-item">
                                        {note.note}{note.octave}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="info-section">
                <h3>🔍 How decryption works:</h3>
                <ul>
                    <li>Upload a MIDI file created by this music generator</li>
                    <li>The system reads the musical notes from the MIDI file</li>
                    <li>Each note is converted back to its original character</li>
                    <li>The sequence is reconstructed to reveal the original text</li>
                    <li>Only works with MIDI files created by this application</li>
                </ul>
                
                <div className="warning-box">
                    <h4>⚠️ Important Notes:</h4>
                    <ul>
                        <li>Only MIDI files generated by this music generator can be decrypted</li>
                        <li>External MIDI files may not decrypt correctly</li>
                        <li>The decryption algorithm matches the encryption process</li>
                        <li><strong>Spaces are preserved</strong> as musical rests in the MIDI file</li>
                        <li><strong>Text is converted to lowercase</strong> during the process</li>
                        <li>Example: "You are Saqlain" becomes "you are saqlain" after decryption</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MIDIDecryptor;
