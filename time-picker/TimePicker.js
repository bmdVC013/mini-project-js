export function activate() {
  document.head.insertAdjacentHTML("beforeend", `
    <style>
      .time-picker {
        position: absolute;
        display: inline-block;
        padding: 10px;
        background: #eee;
        border-radius: 6px;
      }
      
      .time-picker__select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
        text-align: center;
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 6px 10px;
        background-color: #fff;
        cursor: pointer;
        font-family: 'Heebo', sans-serif;
      }
    </style>
  `);

  document.querySelectorAll(".time-pickable").forEach(timePickable => {
    let activePicker = null;

    timePickable.addEventListener("focus", () => {
      if (activePicker) return;

      activePicker = show(timePickable);

      const onClickAway = ({ target }) => {
        if (
          target === activePicker
          || target === timePickable
          || activePicker.contains(target)
        ) {
          return;
        }

        document.removeEventListener("mousedown", onClickAway);
        document.body.removeChild(activePicker);
        activePicker = null;
      };

      document.addEventListener("mousedown", onClickAway);
    })
  });
}

function show(timePickable) {
  const picker = buildPicker(timePickable);
  const { bottom: top, left } = timePickable.getBoundingClientRect();

  picker.style.top = `${top}px`;
  picker.style.left = `${left}px`;

  document.body.appendChild(picker);

  return picker;
}

function remove(timePickable) {

}

function buildPicker(timePickable) {
  const picker = document.createElement("div");
  const hourOptions = [...Array(12).keys()].map(number => numberToOption(number + 1));
  const minuteOptions = [...Array(60).keys()].map(numberToOption);

  picker.classList.add("time-picker");
  picker.innerHTML = `
    <select class="time-picker__select">
      ${hourOptions.join("")}
    </select>
    :
    <select class="time-picker__select">
      ${minuteOptions.join("")}
    </select>
    <select class="time-picker__select">
      <option value="am">am</option>
      <option value="pm">pm</option>
    </select>
  `;

  const selects = getSelectsFromPicker(picker);

  selects.hour.addEventListener("change", () => timePickable.value = getTimeStringFromPicker(picker));
  selects.minute.addEventListener("change", () => timePickable.value = getTimeStringFromPicker(picker));
  selects.meridiem.addEventListener("change", () => timePickable.value = getTimeStringFromPicker(picker));

  if (timePickable.value) {
    const { hour, minute, meridiem } = getTimePartsFromPickable(timePickable);

    selects.hour.value = hour;
    selects.minute.value = minute;
    selects.meridiem.value = meridiem;
  }



  return picker;
}

function getTimePartsFromPickable(timePickable) {
  const pattern = /^(\d+):(\d+) (am|pm)$/;
  const [hour, minute, meridiem] = Array.from(timePickable.value.match(pattern)).splice(1);

  return {
    hour,
    minute,
    meridiem,
  }
}

function getSelectsFromPicker(timePicker) {
  const [hour, minute, meridiem] = timePicker.querySelectorAll(".time-picker__select")
  
  return {
    hour,
    minute,
    meridiem,
  }
}

function getTimeStringFromPicker(timePicker) {
  const selects = getSelectsFromPicker(timePicker);

  return `${selects.hour.value}:${selects.minute.value} ${selects.meridiem.value}`;
}

function numberToOption(number) {
  const padded = number.toString().padStart(2, "0");

  return `<option value="${padded}">${padded}</option>`;
}

