const axios = require('axios')

function seedBoardData({JSONboards, JSONlistBoards}) {
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

result.forEach((item, index) => {
  axios({
    method: 'POST',
            url: 'http://localhost:3000/api/boards',
            data: item
  }).then(function(res) {
    console.log(res.data)
    // console.log(resultsLists[index].title)
    // seedBoardLists(res.data.id, resultsLists[index].title)
  });
});  
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