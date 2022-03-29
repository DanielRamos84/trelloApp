const axios = require('axios')

async function seedBoardData({JSONboards, JSONlistBoards}) {
  axios({
    method: 'DELETE',
    url: 'http://localhost:3000/api/boards',
  });

  axios({
    method: 'DELETE',
    url: 'http://localhost:3000/api/lists',
  });

const result= JSON.parse(JSONboards)
const resultsLists= JSON.parse(JSONlistBoards)

for (let i=0; i < result.length; i++) {
  await axios({
    method: 'POST',
            url: 'http://localhost:3000/api/boards',
            data: result[i]
  }).then(res => {
    console.log(res.data)
    console.log(resultsLists[i].title)
    seedBoardLists(res.data.id, resultsLists[i].title)
  });
  }
  return (result)
}

function seedBoardLists(boardId, listTitle) {
    axios({
    method: 'POST',
    url: 'http://localhost:3000/api/lists',
    data: {
      "boardId": boardId,
      "title": listTitle
  }
  })
  return boardId
}

module.exports = (on, config) => {
  on('task', {
    seedBoardData      
  })
  return config;
};