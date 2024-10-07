document.addEventListener('DOMContentLoaded', function() {
    const convertBtn = document.getElementById('convertBtn');
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const resultContainer = document.getElementById('resultContainer');
    const copyBtn = document.getElementById('copyBtn');

    convertBtn.addEventListener('click', function() {
        const result = convertToJSON(inputText.value);
        outputText.value = result;
//        outputText.style.display = 'block';
        resultContainer.style.display = 'block';
        outputText.select();
    });

    copyBtn.addEventListener('click', async function() {
        try {
            await navigator.clipboard.writeText(outputText.value);
            alert('Copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy text. Please try selecting and copying manually.');
        }
    });
});

function convertToJSON(text) {
        const lines = text.trim().split('\n');
    const chapters = lines
        .filter(line => line.trim() !== '')
        .map(line => {
            const match = line.match(/^(\d{2}):(\d{2})\s(.+)$/);
            if (match) {
                const minutes = parseInt(match[1], 10);
                const seconds = parseInt(match[2], 10);
                const startTime = minutes * 60 + seconds;
                return {
                    startTime: startTime,
                    title: match[3]
                };
            }
            return null;
        })
        .filter(chapter => chapter !== null);

    const jsonObject = {
        version: "1.2.0",
        chapters: chapters
    };

    return JSON.stringify(jsonObject, null, 2);
}
