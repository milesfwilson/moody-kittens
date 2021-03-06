
let kittens = [];

function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let newName = form.name.value.toUpperCase()

  let kitten = {
    id: generateId(),
    name: newName,
    mood: "tolerant",
    affection: 5
  }

  if (kittens.length > 0) {
    if (kittens.filter(kitten => kitten.name === newName).length > 0) {
      alert('This kitten already exists!')
      form.reset()

    } else {
      kittens.push(kitten)
      saveDraw()
      form.reset()
    }

  } else if (kittens.length <= 0) {

    kittens.push(kitten)
    saveDraw()
    form.reset()

  }
}

function saveDraw() {
  saveKittens()
  drawKittens()
}

function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
}

function loadKittens() {
  let jsonString = window.localStorage.getItem("kittens")
  kittens = JSON.parse(jsonString)
}

function drawKittens() {
  let template = ""

  kittens.forEach(kittens => {
    template += `
    <div class="card ${kittens.mood} kitten bg-dark text-light mt-1 mb-1" id="${kittens.id}">
        <div class="d-flex justify-content-center">
        <img src="https://robohash.org/%3C${kittens.name}%3E?set=set4">
        </div>
        <h3 class="mt-1 mb-1">${kittens.name}</h3>
        <h5 class="mt-1 mb-2 uppercase">${kittens.mood}</h5>
        <div class="d-flex space-between m-1 justify-content-center">
        <button onclick="pet(${kittens.id})">Pet</button>
        </div>
        <div class="d-flex space-between m-1 justify-content-center">
        <button onclick="catnip(${kittens.id})">Feed Catnip</button>
        </div>
        <div class="d-flex space-between m-1 justify-content-center">
        <button id="delete" onclick="removeKitten(${kittens.id})">Delete</button>
        </div>
          </div>
      </div>
      `
  })
  document.getElementById("kittens").innerHTML = template
}

function removeKitten(kittenId) {
  for (let i = 0; i < kittens.length; i++) {
    if (kittens[i]['id'] == kittenId) {
      kittens.splice(i, 1)
      saveDraw()
    }
  }
}

function pet(kittenId) {
  let randomNum = generateMood()
  for (let i = 0; i < kittens.length; i++) {
    if ((kittens[i]['id'] == kittenId) && randomNum > "7") {
      kittens[i]['affection']++
    } else if ((kittens[i]['id'] == kittenId) && randomNum <= "7") {
      kittens[i]['affection']--
    }
    saveKittens()
    setKittenMood(kittens[i])
  }
}

function catnip(kittenId) {
  for (let i = 0; i < kittens.length; i++) {
    if (kittens[i]['id'] == kittenId) {
      let kitten = kittens[i]
      kitten['affection'] = 5
      kitten['mood'] = "tolerant"
      saveDraw()
    }
  }
}

function setKittenMood(kitten) {
  if (kitten['affection'] > 6) {
    kitten['mood'] = "happy"
  } else if (kitten['affection'] <= 5 && kitten['affection'] > 3) {
    kitten['mood'] = "tolerant"
  } else if (kitten['affection'] <= 3 && kitten['affection'] > 0) {
    kitten['mood'] = "angry"
  } else if (kitten['affection'] <= 0) {
    kitten['mood'] = "gone"
  }
  saveDraw()
}

function getStarted() {
  document.getElementById("welcome").remove()
  saveKittens()
  loadKittens()
  drawKittens()
}

function generateId() {
  return (
    Math.floor(Math.random() * 10000000) + ""
  );
}

function generateMood() {
  return (
    Math.floor(Math.random() * 10) + ""
  );
}

function pageReload() {
  if (window.localStorage.getItem('kittens') != null) {
    document.getElementById("welcome").remove()
    loadKittens()
    drawKittens()
  } else {
    saveKittens()
    loadKittens()
  }
}

pageReload()