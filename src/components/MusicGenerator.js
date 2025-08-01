import React, { useState } from 'react';
import './MusicGenerator.css';
import { generateMelodyInfo, createWAVFile, createMIDIFile, downloadFile } from '../utils/musicGenerator';

const MusicGenerator = () => {
    const [inputText, setInputText] = useState('');
    const [format, setFormat] = useState('mp3');
    const [harmony, setHarmony] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);



    const formatOptions = [
        { value: 'mp3', label: '🎵 MP3 (Recommended - plays everywhere)' },
        { value: 'midi', label: '🎼 MIDI (Original format)' },
        { value: 'both', label: '📦 Both MP3 and MIDI' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!inputText.trim()) {
            setError('Please enter your name or birthday');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            // Simulate processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Generate melody info
            const melodyData = generateMelodyInfo(inputText);
            const filename = inputText.toLowerCase().replace(/[^a-z0-9]/g, '_');

            // Create files based on format
            let mp3_filename = null;
            let midi_filename = null;
            let wavData = null;
            let midiData = null;

            if (format === 'mp3' || format === 'both') {
                mp3_filename = `${filename}.wav`;
                wavData = createWAVFile(melodyData.melody_info.notes);
            }

            if (format === 'midi' || format === 'both') {
                midi_filename = `${filename}.mid`;
                midiData = createMIDIFile(melodyData.melody_info.notes);
            }

            const result = {
                ...melodyData,
                mp3_filename: mp3_filename,
                midi_filename: midi_filename,
                conversion_success: true,
                harmony: harmony,
                format: format,
                wavData: wavData,
                midiData: midiData
            };

            setResult(result);
        } catch (error) {
            setError('Failed to generate music: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePreview = async () => {
        if (!inputText.trim()) {
            setError('Please enter your name or birthday');
            return;
        }

        try {
            // Generate melody info for preview
            const data = generateMelodyInfo(inputText);
            setResult({ ...data, isPreview: true });
            setError('');
        } catch (error) {
            setError('Failed to preview melody: ' + error.message);
        }
    };

    const handleDownload = (fileType, filename) => {
        try {
            if (fileType === 'wav' && result.wavData) {
                downloadFile(result.wavData, filename, 'audio/wav');
            } else if (fileType === 'midi' && result.midiData) {
                downloadFile(result.midiData, filename, 'audio/midi');
            } else {
                setError('File not available for download');
            }
        } catch (error) {
            setError('Download failed: ' + error.message);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="doodle"></div>
                <h1>🎵 Music Generator</h1>
                <p>Transform your name or birthday into a unique melody</p>
            </div>
                
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="inputText">✏️ Enter your name or birthday:</label>
                    <input 
                        type="text" 
                        id="inputText" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="e.g., John Doe or 15-03-1990" 
                        required 
                    />
                    <div className="input-doodle"></div>
                </div>

                <div className="form-group">
                    <label htmlFor="format">🎨 Choose your format:</label>
                    <select 
                        id="format" 
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                    >
                        {formatOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>



                <div className="checkbox-group">
                    <input 
                        type="checkbox" 
                        id="harmony" 
                        checked={harmony}
                        onChange={(e) => setHarmony(e.target.checked)}
                    />
                    <label htmlFor="harmony">🎶 Add harmony (2 tracks for richer sound)</label>
                </div>

                <div className="button-group">
                    <button type="button" className="btn-secondary" onClick={handlePreview}>
                        👀 Preview
                    </button>
                    <button type="submit" className="btn-primary" disabled={loading}>
                        🎵 Create Music
                    </button>
                </div>
            </form>
            
            {loading && (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Generating your personalized melody...</p>
                </div>
            )}
            
            {error && (
                <div className="error">{error}</div>
            )}
            
            {result && (
                <div className="result">
                    <div className="melody-info">
                        <h3>
                            {result.isPreview ? '👀 Preview - ' : '🎼 '}
                            Your {result.input_type === 'date' ? 'Birthday' : 'Name'} Melody
                        </h3>
                        <p><strong>📝 Input:</strong> "{result.melody_info.input_text}"</p>
                        <p><strong>🎵 Notes:</strong> {result.melody_info.note_count} musical notes</p>
                        <p><strong>⏱️ Duration:</strong> {result.melody_info.total_duration.toFixed(1)} beats</p>
                        <p><strong>🥁 Tempo:</strong> {result.melody_info.tempo} BPM</p>
                        <div className="note-list">
                            {result.melody_info.notes.map((note, index) => (
                                <div key={index} className="note-item">
                                    {note.note}{note.octave}<br />
                                    <small>{note.character}</small>
                                </div>
                            ))}
                        </div>
                        {result.isPreview && (
                            <p style={{
                                marginTop: '15px', 
                                fontStyle: 'italic', 
                                color: '#7f8c8d', 
                                fontFamily: 'Caveat, cursive', 
                                fontSize: '1.1em'
                            }}>
                                ✨ Click "Create Music" to generate and download your files!
                            </p>
                        )}
                    </div>
                    
                    {!result.isPreview && (
                        <div className="download-section">
                            {result.mp3_filename && result.conversion_success && (
                                <button
                                    className="download-btn"
                                    onClick={() => handleDownload('wav', result.mp3_filename)}
                                >
                                    🎵 Download Audio
                                </button>
                            )}
                            {result.midi_filename && (
                                <button
                                    className="download-btn"
                                    onClick={() => handleDownload('midi', result.midi_filename)}
                                >
                                    🎼 Download MIDI
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
            
            <div className="info-section">
                <h3>🔮 How the magic works:</h3>
                <ul>
                    <li>Each letter becomes a musical note (A-Z → C-D-E-F-G-A-B)</li>
                    <li>Numbers set the octave (higher = higher pitch)</li>
                    <li>Position creates rhythm patterns</li>
                    <li>Piano sound with rich harmonics</li>
                    <li>Length controls the tempo</li>
                </ul>

                <div className="encryption-info">
                    <h4>🔐 New Feature: Encryption & Decryption!</h4>
                    <p>Your MIDI files now work like encrypted messages! Use the <strong>🔓 Decrypt</strong> page to upload any MIDI file created here and reveal the original text that was used to generate it.</p>
                    <p><strong>✨ Spaces are preserved</strong> as musical rests, so "Hello World" will decrypt back to "hello world"!</p>
                </div>
            </div>
        </div>
    );
};

export default MusicGenerator;
