document.addEventListener('DOMContentLoaded', function() {
    const convertBtn = document.getElementById('convertBtn');
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');

    convertBtn.addEventListener('click', function() {
        const result = convertToJSON(inputText.value);
        outputText.value = result;
        outputText.style.display = 'block';
        outputText.select();
    });
});

function convertToJSON(text) {
    const lines = text.trim().split('\n');
    const chapters = lines
        .filter(line => line.trim() !== '')
        .map(line => {
            const match = line.match(/^(\d{2}:\d{2})\s(.+)$/);
            if (match) {
                return {
                    startTime: match[1],
                    title: match[2]
                };
            }
            return null;
        })
        .filter(chapter => chapter !== null);

    const jsonObject = {
        chapters: chapters
    };

    return JSON.stringify(jsonObject, null, 2);
}
