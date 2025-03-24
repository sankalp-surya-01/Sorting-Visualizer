let size = Number(document.querySelector(".size_drop").value);
const timer = document.getElementById("timer");
let interval;
let sortingComplete = false;
let comparisons = 0;
let swaps = 0;



document
  .getElementById("dark-mode-toggle")
  .addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });


// This will be the function which updates the DOM
function Timer(start_time) {
  if (sortingComplete) return; // Stop updating the timer if sorting is complete
  var current_time = new Date().getTime();
  var difference = current_time - start_time;
  var minutes = Math.floor((difference % (60 * 60 * 1000)) / (1000 * 60));
  var seconds = Math.floor((difference % (60 * 1000)) / 1000);
  var milliseconds = Math.floor(difference % 1000);
  timer.innerHTML =
    "Time: " + minutes + "m " + seconds + "s " + milliseconds + "ms";
}

function randomNumber(low, high) {
  var create_randomNum = parseInt(
    Math.floor(Math.random() * (high - low + 1) + low)
  );
  return create_randomNum;
}

// Add close button to alerts
function addCloseButtonToAlert(alertElement) {
  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '×';
  closeBtn.className = 'close-btn';
  closeBtn.onclick = function() {
    alertElement.innerHTML = '';
  };
  alertElement.appendChild(closeBtn);
}

// Update your Alert_for_Algo function
const Alert_for_Algo = async (algo) => {
  const alertElement = document.querySelector(".setAlert");
  if (algo === 0) {
    alertElement.innerHTML = "PLEASE SELECT AN ALGORITHM!";
    addCloseButtonToAlert(alertElement);
    return;
  } else {
    alertElement.innerHTML = "";
  }
};

// Update your Alert_for_speed function
const Alert_for_speed = async (speed) => {
  const alertElement = document.querySelector(".speedAlert");
  if (speed === 0) {
    alertElement.innerHTML = "YOU CAN ALSO CHOOSE DIFFERENT SPEED MODES FROM SPEED MENU";
    addCloseButtonToAlert(alertElement);
    setTimeout(() => {
      alertElement.innerHTML = "";
    }, 6000);
    speed = 0.2;
  }
};

function count_comparisons() {
  comparisons++;
  document.getElementById("comparisons").innerHTML = "Comparisons: " + comparisons;
}

function count_swaps() {
  swaps++;
  document.getElementById("No_of_swaps").innerHTML = "Swaps: " + swaps;
}

const start = async () => {
  // Reset comparisons and swaps count
  comparisons = 0;
  swaps = 0;
  document.getElementById("comparisons").innerHTML = "Comparisons: 0";
  document.getElementById("No_of_swaps").innerHTML = "Swaps: 0";

  // every time the user clicks start, we want to use a fresh time
  // so JS isn't comparing an old date
  const d = new Date();
  let startTime = d.getTime();
  interval = setInterval(() => Timer(startTime), 1); //setting the interval in our start function so we can stop it later

  let algo = Number(document.querySelector(".algo_drop").value);
  let speed = Number(document.querySelector(".speed_drop").value);
  let algorithm = new Algorithm(speed);
  await Alert_for_speed(speed);
  await Alert_for_Algo(algo);
  if (algo === 1) await algorithm.BubbleSort();
  if (algo === 2) await algorithm.InsertionSort();
  // if (algo === 3) await algorithm.shelleSort();
  if (algo === 4) await algorithm.SelectionSort();
  if (algo === 5) await algorithm.MergeSort();
  if (algo === 6) await algorithm.QuickSort();

  sortingComplete = true; // Set sorting complete flag
  clearInterval(interval); // Stop the timer
};

const RenderScreen = async () => {
  await RenderList();
};

const randomList = async (Length) => {
  let list = new Array();
  for (let counter = 0; counter < Length; counter++) {
    var NewrandomNumber = randomNumber(1, 100);
    list.push(NewrandomNumber);
  }
  return list;
};

const clear = async () => {
  document.querySelector(".array").innerHTML = "";
};

const RenderList = async () => {
  size = Number(document.querySelector(".size_drop").value);
  if (size === -1) {
    size = randomNumber(5, 150);
  }
  await clear();
  let list = await randomList(size);
  const arrayNode = document.querySelector(".array");
  for (const element of list) {
    const bar = document.createElement("div");
    bar.className = "cell";
    bar.setAttribute("value", String(element));
    bar.style.height = `${4.5 * (1 / 16) * element}em`;
    arrayNode.appendChild(bar);
  }
};

const RenderArray = async (sorted) => {
  let size = Number(document.querySelector(".size_drop").value);
  await clear();
  let list = await randomList(size);
  if (sorted) list.sort((a, b) => a - b);
  const arrayNode = document.querySelector(".array");
  const divnode = document.createElement("div");
  divnode.className = "s-array";
  for (const element of list) {
    const dnode = document.createElement("div");
    dnode.className = "s-cell";
    dnode.innerText = element;
    divnode.appendChild(dnode);
  }
  arrayNode.appendChild(divnode);
};

const response = () => {
  let Navbar = document.querySelector(".navbar");
  if (Navbar.className === "navbar") {
    Navbar.className += " responsive";
  } else {
    Navbar.className = "navbar";
  }
};

document
  .querySelector(".start_start")
  .addEventListener("click", start, response);
document.querySelector(".size_drop").addEventListener("change", RenderScreen);
document.getElementById("reset_btn").addEventListener("click", () => {
  location.reload();
});
window.onload = RenderScreen;

// Algorithm class with sorting methods
class Algorithm {
  constructor(speed) {
    this.speed = speed;
  }

  // Add method to update speed
  updateSpeed(newSpeed) {
    this.speed = newSpeed;
  }

  async BubbleSort() {
    let cells = document.querySelectorAll(".cell");
    let n = cells.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        // Update speed from dropdown
        this.speed = Number(document.querySelector(".speed_drop").value);
        
        cells[i].style.backgroundColor = "#ffd43b";
        cells[i + 1].style.backgroundColor = "#ffd43b";
        await this.sleep(this.speed);
        count_comparisons();
        if (parseInt(cells[i].getAttribute("value")) > parseInt(cells[i + 1].getAttribute("value"))) {
          await this.swap(cells[i], cells[i + 1]);
          count_swaps();
          swapped = true;
        }
        cells[i].style.backgroundColor = "";
        cells[i + 1].style.backgroundColor = "";
      }
      cells[n - 1].classList.add("done");
      n--;
    } while (swapped);
    for (let i = 0; i < cells.length; i++) {
      cells[i].classList.add("done");
    }
    sortingComplete = true;
    clearInterval(interval);
  }

  async InsertionSort() {
    let cells = document.querySelectorAll(".cell");
    let n = cells.length;
    for (let i = 1; i < n; i++) {
      // Update speed from dropdown
      this.speed = Number(document.querySelector(".speed_drop").value);
      
      let key = cells[i];
      let keyValue = parseInt(key.getAttribute("value"));
      let keyHeight = key.style.height;
      key.style.backgroundColor = "#ffd43b";
      await this.sleep(this.speed);
      
      let j = i - 1;
      while (j >= 0 && parseInt(cells[j].getAttribute("value")) > keyValue) {
        cells[j].style.backgroundColor = "#ffd43b";
        await this.sleep(this.speed);
        count_comparisons();
        
        cells[j + 1].style.height = cells[j].style.height;
        cells[j + 1].setAttribute("value", cells[j].getAttribute("value"));
        cells[j].style.backgroundColor = "";
        count_swaps(); // Count each shift as a swap
        j--;
      }
      
      cells[j + 1].style.height = keyHeight;
      cells[j + 1].setAttribute("value", keyValue);
      key.style.backgroundColor = "";
      cells[j + 1].classList.add("done");
    }
    
    for (let i = 0; i < n; i++) {
      cells[i].classList.add("done");
    }
    sortingComplete = true;
    clearInterval(interval);
  }

  async SelectionSort() {
    let cells = document.querySelectorAll(".cell");
    let n = cells.length;
    for (let i = 0; i < n - 1; i++) {
      // Update speed from dropdown
      this.speed = Number(document.querySelector(".speed_drop").value);
      
      let minIndex = i;
      cells[minIndex].style.backgroundColor = "#ffd43b";
      await this.sleep(this.speed);
      
      for (let j = i + 1; j < n; j++) {
        cells[j].style.backgroundColor = "#ffd43b";
        await this.sleep(this.speed);
        count_comparisons();
        
        if (parseInt(cells[j].getAttribute("value")) < parseInt(cells[minIndex].getAttribute("value"))) {
          cells[minIndex].style.backgroundColor = "";
          minIndex = j;
          cells[minIndex].style.backgroundColor = "#ffd43b";
        }
        cells[j].style.backgroundColor = "";
      }
      
      if (minIndex !== i) {
        await this.swap(cells[i], cells[minIndex]);
        count_swaps();
      }
      cells[i].classList.add("done");
      cells[minIndex].style.backgroundColor = "";
    }
    cells[n - 1].classList.add("done");
    sortingComplete = true;
    clearInterval(interval);
  }

  async MergeSort() {
    let cells = document.querySelectorAll(".cell");
    let arr = Array.from(cells).map(cell => parseInt(cell.getAttribute("value")));
    await this.mergeSortHelper(arr, 0, arr.length - 1, cells);
    for (let i = 0; i < cells.length; i++) {
      cells[i].classList.add("done");
    }
    sortingComplete = true;
    clearInterval(interval);
  }

  async mergeSortHelper(arr, left, right, cells) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    await this.mergeSortHelper(arr, left, mid, cells);
    await this.mergeSortHelper(arr, mid + 1, right, cells);
    await this.merge(arr, left, mid, right, cells);
  }

  async merge(arr, left, mid, right, cells) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
      // Update speed from dropdown
      this.speed = Number(document.querySelector(".speed_drop").value);
      
      count_comparisons();
      cells[left + i].style.backgroundColor = "#ffd43b";
      cells[mid + 1 + j].style.backgroundColor = "#ffd43b";
      await this.sleep(this.speed);
      
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        cells[k].style.height = `${4.5 * (1 / 16) * leftArr[i]}em`;
        cells[k].setAttribute("value", leftArr[i]);
        cells[left + i].style.backgroundColor = "";
        i++;
      } else {
        arr[k] = rightArr[j];
        cells[k].style.height = `${4.5 * (1 / 16) * rightArr[j]}em`;
        cells[k].setAttribute("value", rightArr[j]);
        cells[mid + 1 + j].style.backgroundColor = "";
        j++;
      }
      k++;
    }

    while (i < n1) {
      arr[k] = leftArr[i];
      cells[k].style.height = `${4.5 * (1 / 16) * leftArr[i]}em`;
      cells[k].setAttribute("value", leftArr[i]);
      await this.sleep(this.speed);
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = rightArr[j];
      cells[k].style.height = `${4.5 * (1 / 16) * rightArr[j]}em`;
      cells[k].setAttribute("value", rightArr[j]);
      await this.sleep(this.speed);
      j++;
      k++;
    }
  }

  async QuickSort() {
    let cells = document.querySelectorAll(".cell");
    let arr = Array.from(cells).map(cell => parseInt(cell.getAttribute("value")));
    await this.quickSortHelper(arr, 0, arr.length - 1, cells);
    for (let i = 0; i < cells.length; i++) {
      cells[i].classList.add("done");
    }
    sortingComplete = true;
    clearInterval(interval);
  }

  async quickSortHelper(arr, low, high, cells) {
    if (low < high) {
      const pi = await this.partition(arr, low, high, cells);
      await this.quickSortHelper(arr, low, pi - 1, cells);
      await this.quickSortHelper(arr, pi + 1, high, cells);
    }
  }

  async partition(arr, low, high, cells) {
    const pivot = arr[high];
    cells[high].style.backgroundColor = "#ffd43b";
    await this.sleep(this.speed);
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      // Update speed from dropdown
      this.speed = Number(document.querySelector(".speed_drop").value);
      
      cells[j].style.backgroundColor = "#ffd43b";
      await this.sleep(this.speed);
      count_comparisons();
      
      if (arr[j] < pivot) {
        i++;
        await this.swap(cells[i], cells[j]);
        [arr[i], arr[j]] = [arr[j], arr[i]];
        count_swaps();
      }
      cells[j].style.backgroundColor = "";
    }
    
    await this.swap(cells[i + 1], cells[high]);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    cells[high].style.backgroundColor = "";
    count_swaps();
    return i + 1;
  }

  async swap(cell1, cell2) {
    let temp = cell1.style.height;
    cell1.style.height = cell2.style.height;
    cell2.style.height = temp;
    temp = cell1.getAttribute("value");
    cell1.setAttribute("value", cell2.getAttribute("value"));
    cell2.setAttribute("value", temp);
    await this.sleep(this.speed / 2); // Add a small delay during swap for better visualization
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}





