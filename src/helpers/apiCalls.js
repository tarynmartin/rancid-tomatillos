export const getMovies = () => {
  return fetch("https:rancid-tomatillos.herokuapp.com/api/v2/movies")
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Something went wrong')
      }
    })
}

export const loginUser = (loginInfo) => {
  return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginInfo),
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Something went wrong')
      }
    })
}

export const retrieveMovieInfo = (movieId) => {
  return fetch(`https:rancid-tomatillos.herokuapp.com/api/v2/movies/${movieId}`)
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Something went wrong')
      }
    })
}

export const retrieveUserRatings = (userID) => {
  return fetch(`https:rancid-tomatillos.herokuapp.com/api/v2/users/${userID}/ratings`)
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Something went wrong')
      }
    })
}

export const submitUserRating = (userID, ratingInfo) => {
  return fetch(`https:rancid-tomatillos.herokuapp.com/api/v2/users/${userID}/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ratingInfo),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Something went wrong')
        }
      })

}

export const deleteUserRating = (userID, ratingID) => {
  return fetch(`https:rancid-tomatillos.herokuapp.com/api/v2/users/${userID}/ratings/${ratingID}`, {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json'
  }
  })
}

export const getComments = (movieId) => {
  return fetch(`http://localhost:3001/api/v1/movies/${movieId}/comments`)
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Something went wrong')
      }
    })
}

export const postComment = (movieId, newComment) => {
  return fetch(`http://localhost:3001/api/v1/movies/${movieId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newComment)
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Something went wrong')
      }
    })
}
