const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

const talks = [];
const categories = ['AI', 'Machine Learning', 'Web Development', 'Cloud Computing', 'Cybersecurity', 'DevOps'];

for (let i = 0; i < 6; i++) {
  const numSpeakers = faker.number.int({ min: 1, max: 2 });
  const speakers = [];
  for (let j = 0; j < numSpeakers; j++) {
    speakers.push(faker.person.fullName());
  }

  const numCategories = faker.number.int({ min: 1, max: 3 });
  const talkCategories = [];
  for (let j = 0; j < numCategories; j++) {
    talkCategories.push(faker.helpers.arrayElement(categories));
  }

  talks.push({
    title: faker.lorem.words(faker.number.int({ min: 3, max: 6 })).split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    speakers,
    categories: [...new Set(talkCategories)],
    duration: '1 hour',
    description: faker.lorem.paragraph(),
  });
}

fs.writeFileSync(path.join(__dirname, 'public', 'talks.json'), JSON.stringify(talks, null, 2));
console.log('Mock data generated successfully!');
