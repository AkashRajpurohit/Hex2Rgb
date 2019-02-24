let hex = $("#hex"),
		rgb = $("#rgb")
		body = $('body')

const rgbToHex = (rgb) => {
	const a = rgb.split("rgb(")[1].split(")")[0];
	let [r, g, b] = a.split(',')
	if(r && b && g) {
		r = r.trim()
		g = g.trim()
		b = b.trim()
		return (r.length <= 3 && g.length <= 3 && b.length <= 3) ? "#" +
	  ("0" + parseInt(r,10).toString(16)).toUpperCase().slice(-2) +
	  ("0" + parseInt(g,10).toString(16)).toUpperCase().slice(-2) +
	  ("0" + parseInt(b,10).toString(16)).toUpperCase().slice(-2) : '';
	}
}

const hexToRgb = (hex) => {
   var r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
   var g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
   var b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);

    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

const isRGBColor = (color) => {
	if(color.includes('NaN')) {
		return false
	} else {
		return true
	}
}

const isHEXColor = (color) => {
	if(color) {
		return true
	} else {
		return false
	}
}

const handleTextColor = (rgb) => {
	const [r, g, b] = rgb.replace('rgb(', '').replace(')', '').split(',');
	var o = Math.round(((parseInt(r) * 299) +
                      (parseInt(g) * 587) +
                      (parseInt(b) * 114)) / 1000);
	if(o > 125) {
		body.removeClass('dark').addClass('light')
	} else {
		body.removeClass('light').addClass('dark')
	}
}

hex.bind('input change paste keyup mouseup', (e) => {
	const value = e.target.value.replace('#', '')
	const rgb_value = hexToRgb(value)
	if(isRGBColor(rgb_value) && value.length <= 6) {
		rgb.val(rgb_value)
		body.css('backgroundColor', rgb_value)
		handleTextColor(rgb_value)
	} else {
		rgb.val("")
		body.css('backgroundColor', "#225555")
		body.removeClass('dark').removeClass('light')
	}
})

rgb.bind('input change paste keyup mouseup', (e) => {
	let value = e.target.value;
	if(!value.includes('rgb')) {
		value = value.replace('', 'rgb(')
	}
	const hex_value = rgbToHex(value)
	if(isHEXColor(hex_value)) {
		hex.val(hex_value)
		body.css('backgroundColor', hex_value)
		handleTextColor(value)
	} else {
		hex.val("")
		body.css('backgroundColor', "#225555")
		body.removeClass('dark').removeClass('light')
	}
})

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  
  showAddToHomeScreen();
});

const showAddToHomeScreen = () => {

  const ad2hsPrompt = document.querySelector(".ad2hs-prompt");
  const ad2hsBtn = document.querySelector('.btn');
  const closeBtn = document.querySelector('.times')

  ad2hsPrompt.style.display = "block";

  closeBtn.addEventListener('click', closePrompt);

  ad2hsBtn.addEventListener("click", addToHomeScreen);

}

const closePrompt = () => {
  const ad2hsPrompt = document.querySelector(".ad2hs-prompt");
  ad2hsPrompt.style.display = "none";
}

const addToHomeScreen = () => {  
  let a2hsBtn = document.querySelector(".ad2hs-prompt");
  a2hsBtn.style.display = 'none';  // Show the prompt
  deferredPrompt.prompt();  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then(function(choiceResult){
  if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the A2HS prompt');
  } else {
    console.log('User dismissed the A2HS prompt');
  }
  });
  deferredPrompt = null;
}