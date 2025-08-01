// Static music generation utilities for GitHub Pages deployment

// Note frequencies (A4 = 440Hz)
const noteFrequencies = {
    'C': [261.63, 523.25, 1046.50, 2093.00], // C4, C5, C6, C7
    'D': [293.66, 587.33, 1174.66, 2349.32],
    'E': [329.63, 659.25, 1318.51, 2637.02],
    'F': [349.23, 698.46, 1396.91, 2793.83],
    'G': [392.00, 783.99, 1567.98, 3135.96],
    'A': [440.00, 880.00, 1760.00, 3520.00],
    'B': [493.88, 987.77, 1975.53, 3951.07]
};

// Convert text to musical notes
export function textToNotes(text) {
    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const result = [];
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i].toLowerCase();
        if (char.match(/[a-z]/)) {
            const noteIndex = char.charCodeAt(0) - 97; // a=0, b=1, etc.
            const note = notes[noteIndex % 7];
            const octave = Math.floor(noteIndex / 7) + 3; // Start from octave 3
            result.push({
                note: note,
                octave: octave,
                character: text[i]
            });
        } else if (char.match(/[0-9]/)) {
            // Numbers affect octave
            const lastNote = result[result.length - 1];
            if (lastNote) {
                lastNote.octave = parseInt(char) + 3;
            }
        }
    }
    
    return result;
}

// Generate melody info for preview
export function generateMelodyInfo(inputText) {
    const notes = textToNotes(inputText);
    const inputType = inputText.match(/\d/) ? 'date' : 'name';
    
    return {
        success: true,
        input_type: inputType,
        melody_info: {
            input_text: inputText,
            note_count: notes.length,
            total_duration: notes.length * 2.0, // 2 beats per note
            tempo: 120,
            instrument_name: 'Piano',
            notes: notes
        }
    };
}

// Create a simple WAV file (client-side)
export function createWAVFile(notes) {
    const sampleRate = 44100;
    const duration = 0.5; // Duration per note in seconds
    const totalDuration = notes.length * duration;
    const numSamples = Math.floor(totalDuration * sampleRate);
    
    // Create audio buffer (mono)
    const audioBuffer = new Float32Array(numSamples);
    
    // Generate audio for each note with piano-like waveform
    notes.forEach((noteInfo, index) => {
        const startSample = Math.floor(index * duration * sampleRate);
        const endSample = Math.floor((index + 1) * duration * sampleRate);
        const octaveIndex = Math.min(Math.max(noteInfo.octave - 4, 0), 3); // Clamp to available octaves
        const frequency = noteFrequencies[noteInfo.note][octaveIndex];
        
        // Generate piano-like waveform
        for (let i = startSample; i < endSample && i < numSamples; i++) {
            const time = i / sampleRate;
            const noteTime = time - index * duration;
            let amplitude = 0.3 * Math.exp(-8 * noteTime); // Piano-like decay
            
            // Piano harmonics
            const sample = Math.sin(2 * Math.PI * frequency * time) * 0.8 +
                          Math.sin(2 * Math.PI * frequency * 2 * time) * 0.3 +
                          Math.sin(2 * Math.PI * frequency * 3 * time) * 0.1;
            
            audioBuffer[i] += amplitude * sample;
        }
    });
    
    // Convert Float32Array to Int16Array for WAV
    const int16Buffer = new Int16Array(audioBuffer.length);
    for (let i = 0; i < audioBuffer.length; i++) {
        int16Buffer[i] = Math.max(-32768, Math.min(32767, audioBuffer[i] * 32767));
    }
    
    // Create WAV file buffer
    const wavBuffer = createWAVBuffer(int16Buffer, sampleRate);
    return wavBuffer;
}

// Create WAV file buffer
function createWAVBuffer(audioData, sampleRate) {
    const length = audioData.length;
    const buffer = new ArrayBuffer(44 + length * 2);
    const view = new DataView(buffer);
    
    // WAV header
    const writeString = (offset, string) => {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length * 2, true);
    
    // Audio data
    let offset = 44;
    for (let i = 0; i < length; i++) {
        view.setInt16(offset, audioData[i], true);
        offset += 2;
    }
    
    return buffer;
}

// Create a simple MIDI file
export function createMIDIFile(notes) {
    // Simple MIDI file creation (basic implementation)
    const noteMap = {
        'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11
    };
    
    // Create a basic MIDI file structure
    const header = new Uint8Array([
        0x4D, 0x54, 0x68, 0x64, // "MThd"
        0x00, 0x00, 0x00, 0x06, // Header length
        0x00, 0x00, // Format type 0
        0x00, 0x01, // Number of tracks
        0x00, 0x60  // Ticks per quarter note
    ]);
    
    // Create track data
    const trackData = [];
    
    // Add notes
    notes.forEach((noteInfo, index) => {
        const noteNumber = (noteInfo.octave * 12) + noteMap[noteInfo.note];
        const deltaTime = index === 0 ? 0 : 96; // 96 ticks between notes
        
        // Note on
        trackData.push(deltaTime, 0x90, noteNumber, 80); // Note on, velocity 80
        // Note off
        trackData.push(96, 0x80, noteNumber, 0); // Note off after 96 ticks
    });
    
    // End of track
    trackData.push(0, 0xFF, 0x2F, 0);
    
    const track = new Uint8Array([
        0x4D, 0x54, 0x72, 0x6B, // "MTrk"
        0x00, 0x00, 0x00, trackData.length, // Track length
        ...trackData
    ]);
    
    // Combine header and track
    const midiFile = new Uint8Array(header.length + track.length);
    midiFile.set(header, 0);
    midiFile.set(track, header.length);
    
    return midiFile.buffer;
}

// Download file helper
export function downloadFile(data, filename, mimeType) {
    const blob = new Blob([data], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}
