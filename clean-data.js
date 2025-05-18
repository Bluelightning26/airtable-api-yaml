const fs = require('fs');
const yaml = require('js-yaml');

const keepFields = [
    'Code URL',
    'Playable URL',
    'Screenshot',
    'Slack ID',
    'Scoops #',
    'GitHub Username'
];

try {
    const data = yaml.load(fs.readFileSync('api.yaml', 'utf8'));
    console.log('Loaded data:', data);

    if (!data.records || !Array.isArray(data.records)) {
        throw new Error('Invalid or missing "records" field in api.yaml');
    }

    data.records = data.records
        .filter(record => record.fields && record.fields['Review Status'] === 'Approved')
        .map(record => {
            const fields = Object.fromEntries(
                Object.entries(record.fields || {}).filter(([key]) => keepFields.includes(key))
            );

            // Only keep the url in each Screenshot object
            if (Array.isArray(fields.Screenshot)) {
                fields.Screenshot = fields.Screenshot.map(s => ({ url: s.url }));
            }

            return {
                id: record.id,
                createdTime: record.createdTime,
                fields
            };
        });

    fs.writeFileSync('data.yaml', yaml.dump(data, { lineWidth: -1 }));
    console.log('Cleaned api.yaml and saved to data.yaml');
} catch (error) {
    console.error('Error processing YAML file:', error.message);
}