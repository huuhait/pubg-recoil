const { ipcMain } = require('electron');

function pubg() {
  localStorage.setItem('activeGame', 'pubg');
  renderInputs();

  const electron = require('electron');
  const { ipcRenderer } = electron;
  const sr = require('screenres');
  const ioHook = require('iohook');
  const ffi = require('ffi');
  const screenshot = require('screenshot-desktop');
  const sharp = require('sharp');
  const robot = require('robotjs');
  const Jimp = require('jimp');
  let prevKey;
  let pressedKey;

  let visor = false;

  let visorInput = document.querySelector('input.visorInput');
  let canvases = document.querySelectorAll('canvas');
  visorInput.addEventListener('click', function () {
    if (this.checked == true) {
      visor = true;
      canvases.forEach((el) => { el.style.display = "block" });
    } else {
      visor = false;
      canvases.forEach((el) => { el.style.display = "none" });
    }
  });

  let folderGuns = 'pubgGuns';
  let weaponIMG = [

    {
      path: `./${folderGuns}/arbalet.png`,
      name: 'arbalet'
    },
    {
      path: `./${folderGuns}/aug.png`,
      name: 'aug'
    },
    {
      path: `./${folderGuns}/awm.png`,
      name: 'awm'
    },
    {
      path: `./${folderGuns}/beryl.png`,
      name: 'beryl'
    },
    {
      path: `./${folderGuns}/bizon.png`,
      name: 'bizon'
    },
    {
      path: `./${folderGuns}/dbs.png`,
      name: 'dbs'
    },
    {
      path: `./${folderGuns}/dp28.png`,
      name: 'dp'
    },
    {
      path: `./${folderGuns}/g36.png`,
      name: 'g36'
    },
    {
      path: `./${folderGuns}/groza.png`,
      name: 'groza'
    },
    {
      path: `./${folderGuns}/kar98k.png`,
      name: 'kar98k'
    },
    {
      path: `./${folderGuns}/m16a4.png`,
      name: 'm16a4'
    },
    {
      path: `./${folderGuns}/m24.png`,
      name: 'm24'
    },
    {
      path: `./${folderGuns}/m249.png`,
      name: 'm249'
    },

    {
      path: `./${folderGuns}/mg3.png`,
      name: 'mg3'
    },
    {
      path: `./${folderGuns}/mini14.png`,
      name: 'mini'
    },
    {
      path: `./${folderGuns}/mk14.png`,
      name: 'mk'
    },
    {
      path: `./${folderGuns}/mosina.png`,
      name: 'mosina'
    },
    {
      path: `./${folderGuns}/mp5k.png`,
      name: 'mp5k'
    },
    {
      path: `./${folderGuns}/mutant.png`,
      name: 'mutant'
    },
    {
      path: `./${folderGuns}/panzerfaust.png`,
      name: 'panzerfaust'
    },
    {
      path: `./${folderGuns}/qbu.png`,
      name: 'qbu'
    },
    {
      path: `./${folderGuns}/qbz.png`,
      name: 'qbz'
    },
    {
      path: `./${folderGuns}/s686.png`,
      name: 's686'
    },
    {
      path: `./${folderGuns}/s1897.png`,
      name: 's1897'
    },
    {
      path: `./${folderGuns}/saiga.png`,
      name: 'saiga'
    },
    {
      path: `./${folderGuns}/scar.png`,
      name: 'scar'
    },
    {
      path: `./${folderGuns}/sks.png`,
      name: 'sks'
    },
    {
      path: `./${folderGuns}/slr.png`,
      name: 'slr'
    },
    {
      path: `./${folderGuns}/tompson.png`,
      name: 'tompson'
    },
    {
      path: `./${folderGuns}/ump.png`,
      name: 'ump'
    },
    {
      path: `./${folderGuns}/vector.png`,
      name: 'vector'
    },
    {
      path: `./${folderGuns}/vss.png`,
      name: 'vss'
    },
    {
      path: `./${folderGuns}/win94.png`,
      name: 'win94'
    },
    {
      path: `./${folderGuns}/uzi.png`,
      name: 'uzi'
    },
    {
      path: `./${folderGuns}/k2.png`,
      name: 'k2'
    },
    {
      path: `./${folderGuns}/mk12.png`,
      name: 'mk12'
    },
    {
      path: `./${folderGuns}/amr.png`,
      name: 'amr'
    },
    {
      path: `./${folderGuns}/p90.png`,
      name: 'p90'
    },
    {
      path: `./${folderGuns}/ace32.png`,
      name: 'ace32'
    },
    {
      path: `./${folderGuns}/ak47.png`,
      name: 'ak-47'
    },
    {
      path: `./${folderGuns}/p90.png`,
      name: 'p90'
    },
    {
      path: `./${folderGuns}/m416.png`,
      name: 'm416'
    },
    {
      path: `./${folderGuns}/O12.png`,
      name: 'O12'
    },
    {
      path: `./${folderGuns}/O12_1.png`,
      name: 'O12'
    },
    {
      path: `./${folderGuns}/mp9.png`,
      name: 'mp9'
    },
    {
      path: `./${folderGuns}/mp9_1.png`,
      name: 'mp9'
    },
    {
      path: `./${folderGuns}/mp9_2.png`,
      name: 'mp9'
    },

    {
      path: `./${folderGuns}/famas_1.png`,
      name: 'famas'
    }
  ]


  // создание и отрисовка канвасов
  let screenshotCanvas = document.querySelector('canvas.screenshot');
  for (val in weaponIMG) {
    let canvasItem = document.createElement('canvas');
    canvasItem.classList.add('compared');
    canvasItem.setAttribute('weapon', weaponIMG[val].name);

    let context = canvasItem.getContext('2d');
    let img = new Image();
    img.onload = function () {
      context.drawImage(img, 0, 0, 90, 24);
    };
    img.src = weaponIMG[val].path;
    screenshotCanvas.parentElement.appendChild(canvasItem);
  };
  let allCompared = document.querySelectorAll('.compared');




  // try {
  let resolution = '1920x1080';
  // SCREEN RESOLUTION FUNCTION
  let titleSelect = document.querySelector('.title_select');
  let selectOptions = document.querySelector('.wrap_select__options');
  let allOptions = document.querySelectorAll('.select_option');
  document.addEventListener('click', function () {
    titleSelect.classList.remove('active');
    selectOptions.classList.remove('active');
  });
  if (localStorage.getItem('screenRes') == null) {
    localStorage.setItem('screenRes', '1920x1080');
  } else {
    let localResolution = localStorage.getItem('screenRes');
    titleSelect.querySelector('p').innerText = localResolution;
    resolution = localResolution.trim();
  }
  titleSelect.addEventListener('click', function (e) {
    e.stopPropagation();
    if (!titleSelect.classList.contains('active')) {
      titleSelect.classList.add('active');
      selectOptions.classList.add('active');
    }
  });
  allOptions.forEach((el) => {
    el.addEventListener('click', function (e) {
      e.stopPropagation();
      let res = this.getAttribute('resolution');
      localStorage.setItem('screenRes', res);
      resolution = res;
      let name = this.querySelector('span').textContent;
      titleSelect.querySelector('p').innerText = name;
      titleSelect.classList.remove('active');
      selectOptions.classList.remove('active');

    });
  });






  // BUTTON LISTINERS

  let tabsContent = document.querySelectorAll('.tab');
  let tabs = document.querySelectorAll('.tabs__item');
  tabs.forEach(function (el) {
    el.addEventListener('click', function () {
      let idTab = this.getAttribute('tab');
      tabs.forEach((x) => {
        x.classList.remove('active');
      });
      this.classList.add('active');
      tabsContent.forEach((x) => {
        x.classList.remove('active');
        x.classList.remove('anim');
      });
      tabsContent.forEach((x) => {
        let id = x.getAttribute('tab');
        if (idTab == id) {
          x.classList.add('active');
          setTimeout(() => {
            x.classList.add('anim');
          }, 20);
        }
      });
    });
  })

  // back Button
  // let backBtn = document.querySelector('.back');
  // backBtn.addEventListener('click', function() {
  //     back();
  // });


  // function back() {
  //     if (localStorage.getItem('mark_id') !== null) {
  //         localStorage.setItem('back', JSON.stringify({log: logginedLogin, time: time}));
  //         ipcRenderer.send('dataquit');
  //         location.reload();
  //     }
  // };

  let soundVar = true;
  let rightBtnCheck = 0;
  let desabledSecondSlot = 0;

  //SOUND BUTTON
  let soundInput = document.querySelector('.sound');
  soundInput.addEventListener('click', function () {
    if (this.checked == true) {
      soundVar = true;
      localStorage.setItem('sound', 1);
    } else {
      soundVar = false;
      localStorage.setItem('sound', 0);
    }
  });
  if (localStorage.getItem('sound') == null) {
    localStorage.setItem('sound', 1);
  }
  if (localStorage.getItem('sound') !== null) {
    if (+localStorage.getItem('sound') == true) {
      soundInput.checked = true;
      soundVar = true;
    } else {
      soundInput.checked = false;
      soundVar = false;
    }
  }

  // PKM MOUSE BUTTON
  let pkmInput = document.querySelector('.checkpkm');
  pkmInput.addEventListener('click', function () {
    if (this.checked == true) {
      rightBtnCheck = 1;
      localStorage.setItem('pubgPkm', 1);
    } else {
      rightBtnCheck = 0;
      localStorage.setItem('pubgPkm', 0);
    }
  });
  if (localStorage.getItem('pubgPkm') == null) {
    localStorage.setItem('pubgPkm', 0);
  }
  if (localStorage.getItem('pubgPkm') !== null) {
    if (+localStorage.getItem('pubgPkm') == true) {
      pkmInput.checked = true;
      rightBtnCheck = 1;
    } else {
      rightBtnCheck = 0;
      pkmInput.checked = false;
    }
  }

  // DISABLE AUTODETECT SECOND SLOT
  let desabledSecondSlotInput = document.querySelector('.desabledSecondSlot');
  desabledSecondSlotInput.addEventListener('click', function () {
    if (this.checked == true) {
      desabledSecondSlot = 1;
      localStorage.setItem('pubgDesabledSecondSlot', 1);
    } else {
      desabledSecondSlot = 0;
      localStorage.setItem('pubgDesabledSecondSlot', 0);
    }
  });
  if (localStorage.getItem('pubgDesabledSecondSlot') == null) {
    localStorage.setItem('pubgDesabledSecondSlot', 0);
  }
  if (localStorage.getItem('pubgDesabledSecondSlot') !== null) {
    if (+localStorage.getItem('pubgDesabledSecondSlot') == true) {
      desabledSecondSlotInput.checked = true;
      desabledSecondSlot = 1;
    } else {
      desabledSecondSlot = 0;
      desabledSecondSlotInput.checked = false;
    }
  }

  const user32 = ffi.Library('user32.dll', {
    mouse_event: ['void', ['int', 'int', 'int', 'int', 'int']],
    GetDC: ["int32", ["int32"]],
    ReleaseDC: ["int32", ["int32", "int32"]],
    PrintWindow: ['int32', ['int32', 'string', 'int32']],
    GetWindowDC: ['pointer', ['pointer']],
    GetKeyState: ['short', ['int']]
  });
  var gdi32 = new ffi.Library("gdi32", {
    "GetPixel": ["uint32", ["int32", "int32", "int32"]],
  });



  let base64Data;
  function gettaPix() {
    var picture = robot.screen.capture(1510, 1010, 90, 24);
    var image = new Jimp(picture.width, picture.height, function (err, img) {
      img.bitmap.data = picture.image;
      img.getBuffer(Jimp.MIME_PNG, (err, png) => {
        base64Data = btoa(String.fromCharCode.apply(null, png));

      });
    });
  };
  function next() {
    let base64img = new Image();
    let canvaScreen = document.querySelector('.screenshot');
    let context2 = canvaScreen.getContext('2d');
    base64img.onload = function () {
      context2.drawImage(base64img, 0, 0, 90, 24);

    }
    base64img.src = 'data:image/png;base64,' + base64Data;
  }

  // function GetPixelColor(x, y) {
  //     let hdc = user32.GetDC(0);
  //     let pixel = gdi32.GetPixel(hdc, x, y);
  //     output = {
  //         r: pixel       & 0xff,
  //         g:(pixel >> 8) & 0xff,
  //         b:(pixel >>16) & 0xff,
  //         a:(pixel >>24) & 0xff
  //     };
  //     user32.ReleaseDC(0, hdc);
  //     // return RGBToHex(output.r,output.g,output.b);
  //     return [output.r,output.g,output.b];
  // }



  ///////////////////
  //////////////////
  //////////////////

  // AUTODETECT

  let autodetectStatus = 0;

  // autodetect button
  let autodetect = document.querySelector('.autodetect');
  autodetect.addEventListener('click', function () {
    if (this.checked == true) {
      autodetectStatus = 1;
      localStorage.setItem('autodetect', 1);
    } else {
      autodetectStatus = 0;
      localStorage.setItem('autodetect', 0);
    }
  });
  if (localStorage.getItem('autodetect') == null) {
    localStorage.setItem('autodetect', 0);
  }
  if (localStorage.getItem('autodetect') !== null) {
    if (localStorage.getItem('autodetect') == 1) {
      autodetectStatus = 1;
      autodetect.checked = true;
    } else {
      autodetectStatus = 0;
      autodetect.checked = false;
    }
  }



  async function cropper(second) {
    ipcRenderer.send('toDataWin', { message: 'loaderon', body: null });

    let countCompare = 0;
    let minObject = { proc: 1000000, name: 'deffoult' };
    let resultImgBuffer = 0;
    let left = undefined;
    let top = undefined;
    let width = undefined;
    let height = undefined;
    let secOffset = 0;

    if (resolution == '5120x1440') {
      left = Math.floor(1513 + (1513 / 100) * 202.90);
      top = Math.floor(1009 + (1009 / 100) * 33.33);
      width = Math.floor(90 + (90 / 100) * 34);
      height = Math.floor(24 + (24 / 100) * 34.33);
      if (second) {
        secOffset = Math.floor(49 + (49 / 100) * 35);
      }
    }

    if (resolution == '3840x2160') {
      left = Math.floor(1513 + (1513 / 100) * 50);
      top = Math.floor(1009 + (1009 / 100) * 50);
      width = Math.floor(90 + (90 / 100) * 50);
      height = Math.floor(24 + (24 / 100) * 50);
      if (second) {
        secOffset = Math.floor(49 + (49 / 100) * 50);
      }
    }

    if (resolution == '2560x1440') {
      left = Math.floor(1513 + (1513 / 100) * 33.33);
      top = Math.floor(1009 + (1009 / 100) * 33.33);
      width = Math.floor(90 + (90 / 100) * 33.33);
      height = Math.floor(24 + (24 / 100) * 33.33);
      if (second) {
        secOffset = Math.floor(49 + (49 / 100) * 33.33);
      }
    }

    // после обновы
    // left на три больше
    // top на 1 меньше
    if (resolution == '1920x1080') {
      left = 1513;
      top = 1009;
      width = 90;
      height = 24;
      if (second) {
        // old 58
        secOffset = 49;
      }
    }

    if (resolution == '1440x900') {
      left = Math.floor(1513 - (1513 / 100) * 27, 27);
      top = Math.floor(1009 - (1009 / 100) * 16.60);
      width = Math.floor(90 - (90 / 100) * 22);
      height = Math.floor(24 - (24 / 100) * 17);
      if (second) {
        secOffset = Math.floor(49 - (49 / 100) * 16);
      }
    }

    if (resolution == '1728x1080') {

      left = Math.floor(1513 - (1513 / 100) * 12.6);
      top = 1009;
      width = Math.floor(90 - (90 / 100) * 1);
      height = Math.floor(24 + (24 / 100) * 0.2);
      if (second) {
        secOffset = Math.floor(49 + (49 / 100) * 1);
      }
    }


    if (resolution == '1680x1050') {
      left = 1282;
      top = 982;
      width = 88;
      height = 20;
      if (second) {
        secOffset = 46;
      }
    }
    // if (resolution == '1680x1050') {
    //     left = Math.floor(1510 - (1510 / 100) * 12.5) + 1;
    //     top = Math.floor(1010 - (1010 / 100) * 2.77) + 1;
    //     width = Math.floor(90 - (90 / 100) * 12.5);
    //     height = Math.floor(24 - (24 / 100) * 2.77);
    //     if (second) {
    //         secOffset = Math.floor(58 - (58 / 100) * 2.77);
    //     }
    // }

    if (resolution == '1600x900') {
      left = Math.floor(1513 - (1513 / 100) * 16.67) + 1;
      top = Math.floor(1009 - (1009 / 100) * 16.67) + 1;
      width = Math.floor(90 - (90 / 100) * 16.67);
      height = Math.floor(24 - (24 / 100) * 16.67);
      if (second) {
        secOffset = Math.floor(49 - (49 / 100) * 16.67);
      }
    }



    if (resolution == '1366x768') {
      left = Math.floor(1513 - (1513 / 100) * 28.85) + 1;
      top = Math.floor(1009 - (1009 / 100) * 28.85) + 1;
      width = Math.floor(90 - (90 / 100) * 28.85);
      height = Math.floor(24 - (24 / 100) * 28.85);
      if (second) {
        secOffset = Math.floor(49 - (49 / 100) * 27.85);
      }
    }

    // if (resolution == '1280x1024') {
    //     left = Math.floor(1510 - (1510 / 100) * 33.33);
    //     top = Math.floor(1010 - (1010 / 100) * 5.18);
    //     width = Math.floor(90 - (90 / 100) * 33.33);
    //     height = Math.floor(24 - (24 / 100) * 5.18);
    //     if (second) {
    //         secOffset = Math.floor(58 - (58 / 100) * 5.18);
    //     }
    // }

    if (resolution == '1280x720') {
      left = Math.floor(1513 - (1513 / 100) * 33.33);
      top = Math.floor(1009 - (1009 / 100) * 33.33);
      width = Math.floor(90 - (90 / 100) * 33.33);
      height = Math.floor(24 - (24 / 100) * 33.33);
      if (second) {
        secOffset = Math.floor(49 - (49 / 100) * 33.33) + 1;
      }
    }


    await new Promise((resolve, reject) => {


      // старый но рабочий метод через desctop-screenshot и sharp
      // screenshot({format: 'png'}).then((img) => {
      //     sharp(img)
      //     .extract({ left: left, top: top - secOffset, width: width, height: height })
      //     .toBuffer()
      //     .then(data => {
      //         resolve(resultImgBuffer = data);
      //     }).catch(info => {
      //         throw info
      //     });
      //   })
      //   .catch((err) => {})
      if (visor == true) {
        ipcRenderer.send('visor', [left, top - secOffset, width, height]);
      }

      // самый новый метод
      var picture = robot.screen.capture(left, top - secOffset, width, height);
      var image = new Jimp(picture.width, picture.height, function (err, img) {
        img.bitmap.data = picture.image;
        img.getBuffer(Jimp.MIME_PNG, (err, png) => {
          resolve(resultImgBuffer = png);
        });
      });
      // ВЕЗДЕ ПОДКЛЮЧИ РОБОТА И ДЖИМП



    });






    // edge detection
    // var canvas1 = document.getElementById("canvasA");
    // var canvas2 = document.getElementById("canvasB");

    // var image = new MarvinImage();
    // image.load("https://i.ibb.co/qdYpQZc/Screenshot-7.png", imageLoaded);

    // function imageLoaded(){
    //   imageOut = new MarvinImage(image.getWidth(), image.getHeight());
    //   image.draw(canvas1)
    //   Marvin.prewitt(image, imageOut);
    //   Marvin.invertColors(imageOut, imageOut);
    //   Marvin.thresholding(imageOut, imageOut, 150);
    //   imageOut.draw(canvas2)
    // }

    let arrProc = [];
    await new Promise(async (resolve, reject) => {
      // let canvaCompared = document.querySelector('.compared');
      // let context = canvaCompared.getContext('2d');
      let canvaScreen = document.querySelector('.screenshot');
      let context2 = canvaScreen.getContext('2d');

      await new Promise((reso, reje) => {
        // // отрисовка свежего
        base64Data = btoa(String.fromCharCode.apply(null, resultImgBuffer));
        let base64img = new Image();

        let canvaScreen = document.querySelector('.screenshot');
        let context2 = canvaScreen.getContext('2d');
        base64img.onload = function () {
          context2.drawImage(base64img, 0, 0, 90, 24);
          // reso();


          // edge detection
          var image = new MarvinImage();
          image.load(canvaScreen.toDataURL(), imageLoaded);
          function imageLoaded() {
            imageOut = new MarvinImage(image.getWidth(), image.getHeight());
            Marvin.prewitt(image, imageOut);
            Marvin.invertColors(imageOut, imageOut);
            Marvin.thresholding(imageOut, imageOut, 150);
            reso(imageOut.draw(canvaScreen))
          }

        }
        base64img.src = 'data:image/png;base64,' + base64Data;
      });

      // nextIteration();
      // async function nextIteration() {


      // await new Promise((reso, reje) => {
      //     // отрисовка из массива
      //     let img = new Image();
      //     img.onload = function() {
      //         // reso(context.drawImage(img, 0, 0, 90, 40));
      //         reso(context.drawImage(img, 0, 0, 90, 24))

      //         // edge detection
      //         // var image = new MarvinImage();
      //         // image.load(canvaCompared.toDataURL() , imageLoaded);
      //         // function imageLoaded(){
      //         //     imageOut = new MarvinImage(image.getWidth(), image.getHeight());
      //         //     Marvin.prewitt(image, imageOut);
      //         //     Marvin.invertColors(imageOut, imageOut);
      //         //     Marvin.thresholding(imageOut, imageOut, 150);
      //         //     reso(imageOut.draw(canvaCompared))
      //         // }

      //     }
      //     img.src = weaponIMG[countCompare].path;
      // });

      allCompared.forEach((el) => {
        // compare
        let context = el.getContext('2d');
        const img1 = context.getImageData(0, 0, 90, 24);
        const img2 = context2.getImageData(0, 0, 90, 24);
        let res = pixelmatch(img1.data, img2.data, null, 90, 24, { threshold: 0.1 });
        arrProc.push({ proc: res, name: weaponIMG[countCompare].name });
        countCompare += 1;
        if (countCompare == weaponIMG.length) {
          resolve();
        }
      });



      // }
    });

    await new Promise((resolve, reject) => {
      // search min
      for (let i = 0; i < arrProc.length; i++) {
        if (arrProc[i].proc < minObject.proc) {
          minObject = arrProc[i];
        };
        if (i == arrProc.length - 1) {
          resolve();
        }
      };
    });
    console.log(minObject)
    // let debugProc = document.querySelector('.autoderes');
    // debugProc.innerText = minObject.proc;
    // if (minObject.proc < 50) {
    ipcRenderer.send('toDataWin', { message: 'loaderoff', body: null });
    let inputName = document.querySelector(`input.${minObject.name}`);
    if (inputName) {
      if (inputName.checked == false) {
        inputName.click();
        if (soundVar == true) {
          let re;
          re = new Howl({
            src: ['./sound/change_weapon.mp3']
          });
          re.play();
        }
      }
    } else {
      let inputName = document.querySelector(`input.tgl-ios.weapon:checked`);
      if (inputName) {
        inputName.click();
      }
    }
    // }


  };








  // // make screen
  // let makeScreen = document.querySelector('.make-screen');
  // let makeScreenName = document.querySelector('.make-screen-name');
  // makeScreen.addEventListener('click', function() {
  //     setScreen()
  // });

  // function setScreen() {
  //     screenshot({format: 'png'}).then((img) => {
  //         sharp(img)
  //         // .extract({ left: 664, top: 105, width: 270, height: 35 }) через таб название скрин
  //         .extract({ left: 1510, top: 1010, width: 90, height: 24 })
  //         .toFile(`./public/${makeScreenName.value}.png`, function (err) {
  //             if (err) console.log(err);
  //         })
  //         })
  //         .catch((err) => {
  //         // ...
  //         })
  // }




  /////////////////
  ////////////////
  /////////////////




  // .extract({ left: 1510, top: 1010, width: 90, height: 24 })


  // отрисовка кнопок и прослушка
  // let keysModal = document.querySelector('.keysModal');
  // for(let i = 0; i < keysArray.length; i++) {
  //     let item = `
  //         <div class="keysModal__item" code="${keysArray[i].code}">${keysArray[i].name}</div>
  //     `;
  //     keysModal.innerHTML += item;
  // }


  // назначение клавиш
  let fastBtn = document.querySelectorAll('.fastBtn span');
  let keyModal = document.querySelector('.keysModal');
  let keyModalOver = document.querySelector('.keysModalOverlay');

  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('red')) {

      let weaponName = event.target.parentElement.parentElement.querySelector('.name h4');
      let keyboardModalWeapon = document.querySelector('.keysModal .info span.weapon');
      keyboardModalWeapon.innerText = weaponName.textContent;

      let localArr = JSON.parse(localStorage.getItem('keys'));
      let keyboardBtns = keyModal.querySelectorAll('.keysModal__item');
      console.log(game);
      keyboardBtns.forEach((x) => {
        x.classList.remove('blocked');
      });

      if (localArr) {
        for (let i = 0; i < localArr.length; i++) {
          if (localArr[i].game == game) {
            keyboardBtns.forEach((el) => {
              if (el.textContent.toLowerCase() == localArr[i].name.toLowerCase()) {
                el.classList.add('blocked');
              }
            });
          }
        };
      }



      fastBtn.forEach(function (x) {
        x.classList.remove('active');
        x.classList.remove('blink');
        keyModalOver.classList.add('active');
        setTimeout(() => {
          keyModalOver.classList.add('anim');
          keyModal.classList.add('active');
        }, 200);
      });
      if (!event.target.classList.contains('active')) {
        event.target.classList.add('active');
        event.target.classList.add('red');
        event.target.classList.add('blink');
      }
    }
  });

  // прослушка закрывашки модалки клавиш
  let keysModalSvg = document.querySelector('.keysModal .closeKeyboard');
  keysModalSvg.addEventListener('click', function () {
    let fastBtnBlink = document.querySelector('.fastBtn span.blink');

    fastBtnBlink.classList.remove('active');
    fastBtnBlink.classList.remove('blink');
    keyModalOver.classList.remove('anim');

    setTimeout(() => {
      keyModal.classList.remove('active');
      keyModalOver.classList.remove('active');
    }, 200);



  });


  // прослушка кнопок в модалке
  let keyModalKeys = document.querySelectorAll('.keysModal .keysModal__item');
  keyModalKeys.forEach(function (el) {
    el.addEventListener('click', function () {
      let code = this.getAttribute('code');
      let name = this.textContent;
      let game = 'pubg';
      let fastBtnBlink = document.querySelector('.fastBtn span.blink');
      // ставим в локал пушку на которую проставили кнопку и кнопку
      let weapon = fastBtnBlink.parentElement.parentElement.querySelector('input').id;

      fastBtnBlink.parentElement.classList.add('active');
      fastBtnBlink.previousElementSibling.style.opacity = "0";

      if (localStorage.getItem('keys') == null) {
        localStorage.setItem('keys', JSON.stringify([{ weapon: weapon, name: name, code: code, game: 'pubg' }]));
        // listen(code, weapon);
      } else {
        let localArr = JSON.parse(localStorage.getItem('keys'));
        // Проверяем что бы не было такой кнопки ранее назначено
        // for(let i = 0; i < localArr.length; i++) {
        //     if (localArr[i].name == name && localArr[i].game == game) {
        //         throw new Error('Такая кнопка назанчена');
        //     }
        // }
        //
        let obj = { weapon: weapon, name: name, code: code, game: 'pubg' };
        localArr.push(obj);
        localStorage.setItem('keys', JSON.stringify(localArr));
        // listen(code, weapon);
      }
      //
      let item = `
                                ${name}
                                <img class="close-key" src="img/x.svg">
                            `;
      let span = document.createElement('span');
      span.classList.add('done');
      span.innerHTML = item;
      fastBtnBlink.parentElement.insertAdjacentElement('beforeend', span);
      fastBtnBlink.remove();
      keyModal.classList.remove('active');
      keyModalOver.classList.remove('active');
      // x.classList.remove('active');
      // x.classList.remove('blink');
      // keyModal.classList.remove('active');

    });
  });

  // Если есть бинды на кнопках, при входе проставляем
  if (localStorage.getItem('keys') !== null) {
    let localArr = JSON.parse(localStorage.getItem('keys'));
    let allfastBtn = document.querySelectorAll('.fastBtn span');
    for (let i = 0; i < localArr.length; i++) {
      let weapon = localArr[i].weapon;
      let name = localArr[i].name;
      let code = localArr[i].code;
      let game = localArr[i].game;
      for (let j = 0; j < allfastBtn.length; j++) {
        if (allfastBtn[j].parentElement.parentElement.querySelector('input').id == weapon && game == 'pubg') {
          setTimeout(() => {
            let item = `
                                    ${name}
                                    <img class="close-key" src="img/x.svg">
                                    `;
            let span = document.createElement('span');
            span.classList.add('done');
            span.innerHTML = item;
            allfastBtn[j].parentElement.insertAdjacentElement('beforeend', span);

            allfastBtn[j].parentElement.classList.add('active');
            allfastBtn[j].previousElementSibling.style.opacity = "0";

            allfastBtn[j].remove();
            // listen(code, weapon);
          }, 200);
        }
      };

    };
  }




  // прослушка сброса клавиши
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('close-key')) {
      // let weapon = this.parentElement.parentElement.parentElement.querySelector('input').id;

      let span = document.createElement('span');
      span.classList.add('red');
      if (localStorage.getItem('globalLang') == 'ru') {
        span.innerHTML = "назначить";
      } else {
        span.innerHTML = "bind";
      }
      event.target.parentElement.parentElement.insertAdjacentElement('beforeend', span);

      event.target.parentElement.parentElement.classList.remove('active');
      event.target.parentElement.previousElementSibling.style.opacity = "1";

      let targetWeapon = event.target.parentElement.parentElement.parentElement.querySelector('input').id;
      let localArr = JSON.parse(localStorage.getItem('keys'));
      for (let i = 0; i < localArr.length; i++) {
        if (targetWeapon == localArr[i].weapon && localArr[i].game == 'pubg') {
          localArr.splice(i, 1);
          localStorage.setItem('keys', JSON.stringify(localArr));
        };
      };

      event.target.parentElement.remove();
    }
  });


  let game = 'pubg';
  ioHook.on('keyup', event => {
    let localArr = JSON.parse(localStorage.getItem('keys'));
    if (localArr) {
      for (let i = 0; i < localArr.length; i++) {
        if (localArr[i].game == game && localArr[i].code == event.keycode) {
          let input = document.querySelector('input.' + localArr[i].weapon + '');
          input.click();
        }
      };
    }
  });

  // settings modal
  let modalWrapSettings = document.querySelector('.modal-wrap-settings');
  let modalSettings = document.querySelector('.modal-settings');
  let settingsBtn = document.querySelector('section.panel .settings .gears');
  let modalSettingsOk = document.querySelector('.modal-wrap-settings .modal-settings .modal-settings-btns button.ok');
  settingsBtn.addEventListener('click', function () {
    modalWrapSettings.classList.add('active');
    setTimeout(() => {
      modalWrapSettings.classList.add('anim');
      modalSettings.classList.add('active');
      setTimeout(() => {
        modalSettings.classList.add('anim');
      }, 120);
    }, 50);
  });
  modalSettingsOk.addEventListener('click', function () {
    modalWrapSettings.classList.remove('anim');
    modalSettings.classList.remove('anim');
    setTimeout(() => {
      modalWrapSettings.classList.remove('active');
      modalSettings.classList.remove('active');
    }, 100);
    // modalSettings.classList.remove('active');

  });

  // autodetect modal
  // let autodetectBtn = document.querySelector('.settings-item.big button.autodetectbtn');
  // let autodetectBtnClose = document.querySelector('.modal-wrap-settings_2 button.ok');
  // let autodetectWrapModal = document.querySelector('.modal-wrap-settings_2');
  // let autodetectModal = document.querySelector('.modal-settings_2');
  // autodetectBtn.addEventListener('click', function() {
  //     autodetectWrapModal.classList.add('active');
  //     setTimeout(() => {
  //         autodetectModal.classList.add('active');
  //     },50);
  // });
  // autodetectBtnClose.addEventListener('click', function() {
  //     autodetectWrapModal.classList.remove('active');
  //     autodetectModal.classList.remove('active');
  // });
  // AUTODETECT RESPECT PROTECT
  let autodeSetting = document.querySelector('.settings-item.big.autode');
  let autodeResolution = document.querySelector('.wrap_select');

  if (autodeSetting) {
    let logginedRespect = +localStorage.getItem('respect');
    if (logginedRespect == null || logginedRespect == 0) {
      settingsBtn.addEventListener('click', function () {
        setTimeout(() => {
          if (localStorage.getItem('globalLang') == 'ru') {
            errorMessage('Автоопределение оружия доступно только в платной подписке');
          } else {
            errorMessage('Automatic weapon detection is only available with a paid subscription');
          }
        }, 2000);
      });
      autodeSetting.classList.add('blocked');
      autodeResolution.classList.add('blocked');
      localStorage.setItem('autodetect', 0);
    }
  }
  // обход хром полиси
  let sound;
  sound = new Howl({
    src: ['./sound/on.mp3']
  });
  sound.play();

  let logginedLogin = localStorage.getItem('logginedLogin');
  // прверяем а локале логин и пароль если их нет значит мы пропустили вход
  // и кидаем ошибку
  if (localStorage.getItem('mark_id') == null || logginedLogin == null) {
    throw new Error(`
                    [Window Title]
                    Error
                    [Main Instruction]
                    A JavaScript error occurred in the main process
                    [Content]
                    Uncaught exception:
                    TypeError: Error processing argument at index 0, conversion failure
                    at EventEmitter.emit (events.js:191:7)
                    at WebContents.
                    at emitTwo (events.js:106:13)
                    at WebContents.emit (events.js:191:7)
                `)
  }




  let run = false;
  let onPanel = false;
  let count = 0;
  let count2 = 0;
  let count3 = 0;
  let m16a4_ms = 0;
  let ms = 0;
  let change = false;

  let pose = 'standing';
  // sitting
  // lying



  // GLOBAL FUNC

  function clearAllTimers() {
    let max_id;
    max_id = setTimeout(function () { });
    while (max_id--) {
      clearTimeout(max_id);
    }
  };

  function offAllWeapons(activeId) {
    let weaponInputs = document.querySelectorAll('.weapon');
    weaponInputs.forEach(function (el) {
      if (el.id !== activeId) {
        el.checked = false;
      }
    });
  }

  // saveAttach functions
  let allWeaponInputs = document.querySelectorAll('input.weapon');
  allWeaponInputs.forEach((el) => {
    el.addEventListener('click', function () {
      if (this.checked == true) {
        let activeGame = localStorage.getItem('activeGame');
        let thisWeapon = this.id;
        setSavesInLocal(activeGame, thisWeapon);
      }
    });
  });

  function setSavesInLocal(activeGame, weapon) {
    if (localStorage.getItem('saveAttachs')) {
      let localSaves = JSON.parse(localStorage.getItem('saveAttachs'));
      let finded = false;
      localSaves.forEach((el) => {
        if (el.game == activeGame && el.weapon == weapon) {
          finded = true;
          if (el.attach1) {
            attachId = el.attach1;
            setAttach1();
          } else {
            attachId = 1;
            setAttach1();
          }
          if (el.scope) {
            scopeId = el.scope;
            setScope();
          } else {
            scopeId = 1;
            setScope();
          }
          if (el.attach2) {
            gripsId = el.attach2;
            setAttach2();
          } else {
            gripsId = 1;
            setAttach2();
          }
        }
      });
      if (finded == false) {
        attachId = 1;
        setAttach1();
        scopeId = 1;
        setScope();
        gripsId = 1;
        setAttach2();
      }
    }
  };

  function setScope() {
    ipcRenderer.send('clickScope', { id: String(scopeId) });
    pubgScopeFactor = pubgScopeData[scopeId - 1];
  };

  function setAttach1() {
    ipcRenderer.send('clickScope', { id: 'attach_' + attachId });
    attachFactor = pubgAttachData[attachId - 1];
  };

  function setAttach2() {
    ipcRenderer.send('clickScope', { id: 'grips_' + gripsId });
    gripFactor = pubgGripsData[gripsId - 1];
  };

  // IO HOOKS

  // START ON F2
  // freeze

  ipcRenderer.on('win-local-pos', (event, arg) => {
    if (arg.y >= sr.get()[1]) {
      localStorage.setItem('winx', sr.get()[0] - 620);
      localStorage.setItem('winy', sr.get()[1] - 450);
    } else {
      localStorage.setItem('winx', arg.x);
      localStorage.setItem('winy', arg.y);
    }
  });

  let freezeStatus = 0;

  function offActiveWeapon() {

  };

  function onActiveWeapon() {

  };



  // ctrl + M
  // ioHook.registerShortcut([29, 50], (keys) => {
  //     setTimeout(() => {
  //         inventory = 0;
  //         map = 0;
  //         if (localStorage.getItem('lastWeapon')) {
  //             let activeWeapon = document.querySelector('#'+ localStorage.getItem('lastWeapon'));
  //             if (activeWeapon) {
  //                 activeWeapon.click();
  //             }
  //         }
  //         alert('pizfa')
  //     },400);
  //     // включаем макрос
  // });

  ioHook.on('keydown', event => {
    prevKey = pressedKey;
    pressedKey = event.keycode;
    console.log('prevKey:' + prevKey);


  });

  let keyPressed = [];



  // ALT
  let alt = false;
  ioHook.on('keydown', event => {
    if (event.keycode == 56) {
      alt = true;
      setTimeout(() => {
        alt = false;
      }, 1000);
    }

    if (!keyPressed.includes(event.keycode)) {
      keyPressed.push(event.keycode)
    }
  });


  // ALT + TAB
  let grenadeActive = false;

  // const id = ioHook.registerShortcut([15, 56], (keys) => {
  //     console.log('Shortcut called with keys:', keys);
  // });

  ioHook.on('keyup', event => {

    let ind = keyPressed.indexOf(event.keycode);
    if (ind !== -1) {
      keyPressed.splice(ind, 1);
    }

    console.log(event.keycode)
    gettaPix();

    if (event.keycode == 42) {
      shift = false;
    }

    if (autodetectStatus == true) {
      if (event.keycode === 2) {
        setTimeout(() => {
          cropper();
        }, 100);
      }
      if (event.keycode === 3) {
        setTimeout(() => {
          if (desabledSecondSlot == 0) {
            cropper('second');
          }
        }, 100);
      }
    }

    let dropWeaponKey = JSON.parse(localStorage.getItem('defaultKeys')).dropWeapon;
    if (event.keycode === dropWeaponKey) {
      let activeWeapon = document.querySelector('.tgl-ios.weapon:checked');
      if (activeWeapon) {
        localStorage.setItem('lastWeapon', activeWeapon.id);
        activeWeapon.click();
      } else {
        if (localStorage.getItem('lastWeapon')) {
          let activeWeapon = document.querySelector('#' + localStorage.getItem('lastWeapon'));
          if (activeWeapon) {
            activeWeapon.click();
          }
        }
      }
    }
    // f2 start
    let settingsWindow = document.querySelector('.modal-settings');
    let closeSettingsButton = document.querySelector('.modal-settings-btns button.ok');
    let onoffKey = JSON.parse(localStorage.getItem('defaultKeys')).onoff;
    if (event.keycode === onoffKey) {
      if (onPanel == false) {
        if (settingsWindow.classList.contains('active')) {
          closeSettingsButton.click();
        };
        onPanel = true;
        inventory = 0;
        pubgSittingFactor = 1;
        sitting = 0;
        lying = 0;
        let scopeProcess = localStorage.getItem('processScope');
        ipcRenderer.send('activated', { scope: scopeProcess });
        if (soundVar == true) {
          let sound;
          sound = new Howl({
            src: ['./sound/on.mp3']
          });
          sound.play();
        }
      } else {
        onPanel = false;
        inventory = 0;
        pubgSittingFactor = 1;
        sitting = 0;
        lying = 0;
        let scopeProcess = localStorage.getItem('processScope');
        ipcRenderer.send('diactivated', { scope: scopeProcess });
        // localStorage.removeItem('winx');
        // localStorage.removeItem('winy');
        if (soundVar == true) {
          let sound;
          sound = new Howl({
            src: ['./sound/off.mp3']
          });
          sound.play();
        }
      }
    }
    /// freeze
    let freezeKey = JSON.parse(localStorage.getItem('defaultKeys')).freeze;
    if (event.keycode === freezeKey) {
      if (freezeStatus == 0) {
        freezeStatus = 1;

        ipcRenderer.send('freeze', { status: true });
      } else {
        freezeStatus = 0;

        ipcRenderer.send('freeze', { status: false });
      }
    }
    ////

    // ALT
    if (event.keycode == 56) {
      alt = true;
      setTimeout(() => {
        alt = false;
      }, 1000);
    }

    ////// INVENTORY ////////
    // TAB & I
    if (event.keycode === 15 || event.keycode === 23) {
      if (alt == false) {
        if (onPanel == true) {
          if (inventory == 0 && map == 0) {
            inventory = 1;
            map = 0;
            let activeWeapon = document.querySelector('.tgl-ios.weapon:checked');
            if (activeWeapon) {
              localStorage.setItem('lastWeapon', activeWeapon.id);
              activeWeapon.click();
            };
            // отключаем макрос
          } else if (inventory == 1 && map == 0) {
            inventory = 0;
            map = 0;
            if (localStorage.getItem('lastWeapon')) {
              let activeWeapon = document.querySelector('#' + localStorage.getItem('lastWeapon'));
              if (activeWeapon) {
                activeWeapon.click();
              }
            }
            // включаем макрос
          } else if (inventory == 0 && map == 1) {
            inventory = 1;
            map = 0;
            let activeWeapon = document.querySelector('.tgl-ios.weapon:checked');
            if (activeWeapon) {
              localStorage.setItem('lastWeapon', activeWeapon.id);
              activeWeapon.click();
            };
            // отключаем макрос
          }
        }
      }

    }
    // M

    if (event.keycode === 50) {
      if (prevKey !== 29) {
        if (onPanel == true) {
          if (map == 0 && inventory == 0) {
            map = 1;
            inventory == 0
            let activeWeapon = document.querySelector('.tgl-ios.weapon:checked');
            if (activeWeapon) {
              localStorage.setItem('lastWeapon', activeWeapon.id);
              activeWeapon.click();
            };
            // отключаем макрос
          } else if (map == 1 && inventory == 0) {
            map = 0;
            inventory == 0
            if (localStorage.getItem('lastWeapon')) {
              let activeWeapon = document.querySelector('#' + localStorage.getItem('lastWeapon'));
              if (activeWeapon) {
                activeWeapon.click();
              }
            }
            // включаем макрос
          } else if (map == 0 && inventory == 1) {
            map = 1;
            inventory = 0
            let activeWeapon = document.querySelector('.tgl-ios.weapon:checked');
            if (activeWeapon) {
              localStorage.setItem('lastWeapon', activeWeapon.id);
              activeWeapon.click();
            };
            // отключаем макрос
          }
        }
      }
    }

    // ESC
    if (event.keycode === 1) {
      if (onPanel == true) {
        inventory = 0;
        map = 0;
        let activeWeapon = document.querySelector('.tgl-ios.weapon:checked');
        if (activeWeapon == null || activeWeapon == undefined) {
          if (localStorage.getItem('lastWeapon')) {
            let activeWeapon = document.querySelector('#' + localStorage.getItem('lastWeapon'));
            if (activeWeapon) {
              activeWeapon.click();
            }
          }
        }
      }
    }

    // 5 GRANADES
    let granadeKey = JSON.parse(localStorage.getItem('defaultKeys')).pubgGranade;
    if (event.keycode === granadeKey) {
      grenadeActive = true;
      let activeWeapon = document.querySelector('.tgl-ios.weapon:checked');
      if (activeWeapon) {
        localStorage.setItem('lastWeapon', activeWeapon.id);
        activeWeapon.click();
      };
    }







    ////////////////////////
    ///////POSES////////////


    // C
    let sitkey = JSON.parse(localStorage.getItem('defaultKeys')).pubgSit;
    if (event.keycode === sitkey) {
      if (onPanel == true) {
        if (sitting == 0) {
          // включаем ситтинг
          sitting = 1;
          lying = 0;
          pubgSittingFactor = 1.3;
          ipcRenderer.send('pose', { pose: 'seet' });
        } else {
          // выключаем ситтинг
          sitting = 0;
          lying = 0;
          pubgSittingFactor = 1;
          ipcRenderer.send('pose', { pose: 'stay' });
        }
      }
    }


    // Z
    let liekey = JSON.parse(localStorage.getItem('defaultKeys')).pubgLie;
    if (event.keycode === liekey) {
      if (onPanel == true) {
        if (lying == 0) {
          sitting = 0;
          lying = 1;
          pubgSittingFactor = 1.8;
          ipcRenderer.send('pose', { pose: 'lying' });
        } else {
          sitting = 0;
          lying = 0;
          pubgSittingFactor = 1;
          ipcRenderer.send('pose', { pose: 'stay' });
        }
      }
    }




    // SPACE
    let jumpkey = JSON.parse(localStorage.getItem('defaultKeys')).pubgJump;
    if (event.keycode === jumpkey) {
      sitting = 0;
      lying = 0;
      pubgSittingFactor = 1;
      ipcRenderer.send('pose', { pose: 'stay' });
    }



    ///////////////////////

    ///// ARROWS scopes
    if (event.keycode === 61008) {
      if (scopeId < 5) {
        scopeId += 1;
      }
      setScope();
      let activeWeapon = document.querySelector('.tgl-ios.weapon:checked');
      if (activeWeapon) {
        if (saveAttachments == 1) {
          saveAttach('pubg', activeWeapon.id, scopeId, null, null);
        }
      }
    }

    if (event.keycode === 61000) {
      if (scopeId > 1) {
        scopeId -= 1;
      }
      setScope();
      let activeWeapon = document.querySelector('.tgl-ios.weapon:checked');
      if (activeWeapon) {
        if (saveAttachments == 1) {
          saveAttach('pubg', activeWeapon.id, scopeId, null, null);
        }
      }
    }
    ///////

    ////// НАСАДКИ
    if (event.keycode === 61003) {
      if (attachId > 1) {
        attachId -= 1;
      }
      setAttach1();
      let activeWeapon = document.querySelector('.tgl-ios.weapon:checked');
      if (activeWeapon) {
        if (saveAttachments == 1) {
          saveAttach('pubg', activeWeapon.id, null, attachId, null);
        }
      }
    }
    if (event.keycode === 61005) {

      if (attachId < 3) {
        attachId += 1;
      }
      setAttach1();
      let activeWeapon = document.querySelector('.tgl-ios.weapon:checked');
      if (activeWeapon) {
        if (saveAttachments == 1) {
          saveAttach('pubg', activeWeapon.id, null, attachId, null);
        }
      }
    }
    //////

    ////// GRIPS
    if (event.keycode === 61009) {
      if (gripsId < 4) {
        gripsId += 1;
      }
      setAttach2();
      let activeWeapon = document.querySelector('.tgl-ios.weapon:checked');
      if (activeWeapon) {
        if (saveAttachments == 1) {
          saveAttach('pubg', activeWeapon.id, null, null, gripsId);
        }
      }
    }
    if (event.keycode === 61001) {
      if (gripsId > 1) {
        gripsId -= 1;
      }
      setAttach2();
      let activeWeapon = document.querySelector('.tgl-ios.weapon:checked');
      if (activeWeapon) {
        if (saveAttachments == 1) {
          saveAttach('pubg', activeWeapon.id, null, null, gripsId);
        }
      }
    }

    //////
  });

  pubgScopeData = [1, 1.8, 2.6, 3.64, 5.40];
  pubgGripsData = [1, 1.25, 1.2, 1.1];
  pubgAttachData = [1, 1.28, 1.14];

  let scopeId = 1;
  let gripsId = 1;
  let attachId = 1;

  let gripFactor = 1;
  let attachFactor = 1;

  // let gripgrip = document.querySelector('.gripgrip');
  // gripgrip.addEventListener('change', function() {
  //     gripFactor = gripgrip.value;
  // });

  let shackerInterval;
  function antiShaker(step) {
    user32.mouse_event(1, 0, 8, 0, 0);
    shackerInterval = setInterval(() => {
      user32.mouse_event(1, 0, 8, 0, 0);
    }, 85);
  };

  //poses status
  let sitting = 0;
  let lying = 0;
  // pubgSittingFactor
  let inventory = 0;
  let map = 0;

  // end start on f2
  /////

  ioHook.on('mousedown', event => {

    setTimeout(() => {
      if (grenadeActive == true) {
        if (localStorage.getItem('lastWeapon')) {
          let activeWeapon = document.querySelector('#' + localStorage.getItem('lastWeapon'));
          if (activeWeapon) {
            activeWeapon.click();
          }
        }
        grenadeActive = false;
      } else {
        // if (rightBtnCheck == true) {
        //   if (user32.GetKeyState(0x01) !== 0 && user32.GetKeyState(0x01) !== 1 && user32.GetKeyState(0x02) < 0) {
        //     run = true;
        //   }
        // } else {
        //   if (user32.GetKeyState(0x01) < 0) {
        //     run = true;
        //   }
        // }
      }
      // antiShaker(null);
    }, 10);
  });
  ioHook.on('mouseup', event => {
    setTimeout(() => {
      // clearInterval(shackerInterval);

      if (user32.GetKeyState(0x01) !== 0 && user32.GetKeyState(0x01) !== 1) {
        user32.mouse_event(4, 0, 0, 0, 0);
      }
    }, 10);



    ostatokX = 0;
    ostatokY = 0;
    ostatokXneg = 0;
    ostatokYneg = 0;

    run = false;
    count = 0;
    count2 = 0;
    count3 = 0;
    m16a4_ms = 0;
    ms = 0;
    change = false;
  });



  let timeout;


  let ostatok_ind1 = 0;
  let ostatok_ind2 = 0;

  function weaponTehnicsSingle(weaponName, intervalMs, index_1, index_2, mainDelay, delay, x2, x3) {
    let weaponInput = document.querySelector(`input.${weaponName}`);
    let parent = weaponInput.parentElement.parentElement.parentElement;
    weaponInput.addEventListener('click', function () {

      let resultIndex_1 = index_1;
      let resultIndex_2;
      if (index_2 !== null) {
        resultIndex_2 = index_2;
      }

      if (this.checked == true) {
        allItems.forEach((el) => { el.classList.remove('active') });
        parent.classList.add('active');
        clearAllTimers();
        offAllWeapons(this.id);
        activateInterval();
        ipcRenderer.send('update-weapon', { weapon: weaponName });
      } else {
        parent.classList.remove('active');
        clearAllTimers();
        ipcRenderer.send('update-weapon', { weapon: "---" });
      };

      function activateInterval() {
        if (index_2 == null) {
          // оружие с одним индексом
          timeout = setInterval(() => {
            if (run == true && onPanel == true) {
              if (ms < delay) {
                x = resultIndex_1 * multiply_to_ideal / pubgFactor * pubgScopeFactor / pubgSittingFactor;

                if (ostatok_ind1 > 1) {
                  user32.mouse_event(1, 0, Math.floor(x + 1), 0, 0);
                  ostatok_ind1 = 0;
                } else {
                  user32.mouse_event(1, 0, Math.floor(x), 0, 0);
                }


                if (Number.isInteger(x) == false) {
                  const resultX = x.toString().split('.')[1]
                  // console.log(Number("0." + resultX))
                  ostatok_ind1 += Number("0." + resultX);
                  console.log(ostatok_ind1)
                }

                ms += 10;

              } else if (ms > delay - 20) {
                user32.mouse_event(2, 0, 0, 0, 0);

                ms = 0;
              }
            }
          }, intervalMs);
        } else {
          // оружие с двумя индексами
          timeout = setInterval(() => {
            if (run == true && onPanel == true) {
              if (m16a4_ms < mainDelay) {
                if (ms < delay) {

                  x = resultIndex_1 * multiply_to_ideal / pubgFactor * pubgScopeFactor / pubgSittingFactor;

                  if (ostatok_ind1 > 1) {
                    user32.mouse_event(1, 0, Math.floor(x + 1), 0, 0);
                    ostatok_ind1 = 0;
                  } else {
                    user32.mouse_event(1, 0, Math.floor(x), 0, 0);
                  }


                  if (Number.isInteger(x) == false) {
                    const resultX = x.toString().split('.')[1]
                    // console.log(Number("0." + resultX))
                    ostatok_ind1 += Number("0." + resultX);
                    console.log(ostatok_ind1)
                  }


                  count += 1;
                  ms += 10;
                  m16a4_ms += 10;

                } else if (ms > delay - 20) {
                  user32.mouse_event(2, 0, 0, 0, 0);

                  ms = 0;
                  m16a4_ms += 10;
                }
              } else {
                if (ms < delay) {
                  x = resultIndex_2 * multiply_to_ideal / pubgFactor * pubgScopeFactor / pubgSittingFactor;

                  if (ostatok_ind2 > 1) {
                    user32.mouse_event(1, 0, Math.floor(x + 1), 0, 0);
                    ostatok_ind2 = 0;
                  } else {
                    user32.mouse_event(1, 0, Math.floor(x), 0, 0);
                  }


                  if (Number.isInteger(x) == false) {
                    const resultX = x.toString().split('.')[1]
                    // console.log(Number("0." + resultX))
                    ostatok_ind2 += Number("0." + resultX);
                    console.log(ostatok_ind2)
                  }
                  count += 1;
                  ms += 10;
                  m16a4_ms += 10;

                } else if (ms > delay - 20) {
                  user32.mouse_event(2, 0, 0, 0, 0);

                  ms = 0;
                  m16a4_ms += 10;
                }
              }
            }
          }, intervalMs);
        }
      }
    });
  };
  let allItems = document.querySelectorAll('.inputWrap');


  let ostatokX = 0;
  let ostatokY = 0;
  let ostatokXneg = 0;
  let ostatokYneg = 0;

  let multiply_to_ideal = 12;
  let multi = 1.3;

  function wt(weaponName, array) {
    // let scopee = document.querySelector('.scopee');
    let weaponInput = document.querySelector(`input.${weaponName}`);
    let parent = weaponInput.parentElement.parentElement.parentElement;
    weaponInput.addEventListener('click', function () {
      if (this.checked == true) {
        allItems.forEach((el) => { el.classList.remove('active') });
        parent.classList.add('active');
        activeSingle = 0;
        clearAllTimers();
        offAllWeapons(this.id);
        activateInterval();
        ipcRenderer.send('update-weapon', { weapon: weaponName });
      } else {
        parent.classList.remove('active');
        clearAllTimers();
        ipcRenderer.send('update-weapon', { weapon: "---" });
      };
      function activateInterval() {
        timeout = setInterval(() => {
          if (run == true && onPanel == true) {

            let x
            let y


            // scopes
            // 8x+   = 2.9
            // 7x+   = 2.6
            // 6x+   = 2.3
            // 5x+   = 2
            // 4x+   = 1.6


            if (ostatokX >= 1) {
              x = (array[count][0] * multi / pubgFactor) * pubgScopeFactor / pubgSittingFactor / gripFactor / attachFactor + 1;
              ostatokX -= 1;
            } else if (ostatokXneg <= 1) {
              x = (array[count][0] * multi / pubgFactor) * pubgScopeFactor / pubgSittingFactor / gripFactor / attachFactor - 1;
              ostatokXneg += 1;
            } else {
              x = (array[count][0] * multi / pubgFactor) * pubgScopeFactor / pubgSittingFactor / gripFactor / attachFactor;
            }
            if (Number.isInteger(x) == false) {
              if (x > 0) {
                const resultX = x.toString().split('.')[1]
                // console.log(Number("0." + resultX))
                ostatokX += Number("0." + resultX);
                console.log(ostatokX)
              } else {
                const resultX = x.toString().split('.')[1]
                // console.log(Number("0." + resultX))
                ostatokXneg += Number("-0." + resultX);
                console.log(ostatokXneg)
              }
            }

            if (ostatokY >= 1) {
              y = (array[count][1] * multi / pubgFactor) * pubgScopeFactor / pubgSittingFactor / gripFactor / attachFactor + 1;
              ostatokY -= 1;
            } else if (ostatokYneg <= 1) {
              y = (array[count][1] * multi / pubgFactor) * pubgScopeFactor / pubgSittingFactor / gripFactor / attachFactor - 1;
              ostatokYneg += 1;
            } else {
              y = (array[count][1] * multi / pubgFactor) * pubgScopeFactor / pubgSittingFactor / gripFactor / attachFactor;
            }

            if (Number.isInteger(y) == false) {
              if (y > 0) {
                const resultY = y.toString().split('.')[1]
                // console.log(Number("0." + resultY))
                ostatokY += Number("0." + resultY);
                console.log(ostatokY)
              } else {
                const resultY = y.toString().split('.')[1]
                // console.log(Number("0." + resultY))
                ostatokYneg += Number("-0." + resultY);
                console.log(ostatokYneg)
              }

            }

            let shiftkey = JSON.parse(localStorage.getItem('defaultKeys')).pubgShift;
            if (keyPressed.includes(shiftkey)) {
              user32.mouse_event(1, x * 1.3, y * 1.3, 0, 0);
            } else {
              user32.mouse_event(1, x, y, 0, 0);
            }


            count += 1;
          }
        }, 20);
      };
    });
  };

  function weaponTehnics(weaponName, intervalMs, index_1, index_2, index_3, firstDelay, secondDelay, thirdDelay, x2, x3) {
    let weaponInput = document.querySelector(`input.${weaponName}`);
    let parent = weaponInput.parentElement.parentElement.parentElement;
    weaponInput.addEventListener('click', function () {
      let resultIndex_1 = index_1;
      let resultIndex_2 = index_2;
      let resultIndex_3;
      if (index_3 !== null) {
        resultIndex_3 = index_3;
      }

      if (this.checked == true) {
        allItems.forEach((el) => { el.classList.remove('active') });
        parent.classList.add('active');
        clearAllTimers();
        offAllWeapons(this.id);
        activateInterval();
        ipcRenderer.send('update-weapon', { weapon: weaponName });
      } else {
        parent.classList.remove('active');
        clearAllTimers();
        ipcRenderer.send('update-weapon', { weapon: "---" });
      };

      function activateInterval() {
        if (index_3 == null) {
          // оружие с двумя индексами
          timeout = setInterval(() => {
            if (run == true && onPanel == true) {

              let x
              let y


              if (ostatokX >= 1) {

                if (ms < firstDelay) {
                  x = (resultIndex_1 * multiply_to_ideal / pubgFactor) * pubgScopeFactor / pubgSittingFactor / gripFactor / attachFactor + 1;
                  ms += 10;
                } else {
                  x = (resultIndex_2 * multiply_to_ideal / pubgFactor) * pubgScopeFactor / pubgSittingFactor / gripFactor / attachFactor + 1;
                  ms += 10;
                }
                ostatokX -= 1;
              } else if (ostatokXneg <= 1) {
                if (ms < firstDelay) {
                  x = (resultIndex_1 * multiply_to_ideal / pubgFactor) * pubgScopeFactor / pubgSittingFactor / gripFactor / attachFactor - 1;
                  ms += 10;
                } else {
                  x = (resultIndex_2 * multiply_to_ideal / pubgFactor) * pubgScopeFactor / pubgSittingFactor / gripFactor / attachFactor - 1;
                  ms += 10;
                }
                ostatokXneg += 1;
              } else {
                if (ms < firstDelay) {
                  x = (resultIndex_1 * multiply_to_ideal / pubgFactor) * pubgScopeFactor / pubgSittingFactor / gripFactor / attachFactor;
                  ms += 10;
                } else {
                  x = (resultIndex_2 * multiply_to_ideal / pubgFactor) * pubgScopeFactor / pubgSittingFactor / gripFactor / attachFactor;
                  ms += 10;
                }
              }
              if (Number.isInteger(x) == false) {
                if (x > 0) {
                  const resultX = x.toString().split('.')[1]
                  // console.log(Number("0." + resultX))
                  ostatokX += Number("0." + resultX);
                  console.log(ostatokX)
                } else {
                  const resultX = x.toString().split('.')[1]
                  // console.log(Number("0." + resultX))
                  ostatokXneg += Number("-0." + resultX);
                  console.log(ostatokXneg)
                }
              }




              let shiftkey = JSON.parse(localStorage.getItem('defaultKeys')).pubgShift;
              if (keyPressed.includes(shiftkey)) {
                user32.mouse_event(1, 0, x * 1.3, 0, 0);
              } else {
                user32.mouse_event(1, 0, x, 0, 0);
              }


              count += 1;







            }
          }, intervalMs);
        } else {
          // оружие с тремя индексами
          timeout = setInterval(() => {
            // console.log('тикает 2')
            if (run == true && onPanel == true) {
              let x
              let y

              if (ostatokX >= 1) {
                if (ms < firstDelay) {
                  x = (resultIndex_1 * multiply_to_ideal / pubgFactor) * pubgScopeFactor / pubgSittingFactor / gripFactor / attachFactor + 1;
                  ms += 10;
                }
                else if (ms > secondDelay[0] && ms < secondDelay[1]) {
                  x = (resultIndex_2 * multiply_to_ideal / pubgFactor) * pubgScopeFactor / pubgSittingFactor / gripFactor / attachFactor + 1;
                  ms += 10;
                }
                else if (ms > thirdDelay) {
                  x = (resultIndex_3 * multiply_to_ideal / pubgFactor) * pubgScopeFactor / pubgSittingFactor / gripFactor / attachFactor + 1;
                  ms += 10;
                }

                ostatokX -= 1;
              } else if (ostatokXneg <= 1) {
                if (ms < firstDelay) {
                  x = (resultIndex_1 * multiply_to_ideal / pubgFactor) * pubgScopeFactor / pubgSittingFactor / gripFactor / attachFactor - 1;
                  ms += 10;

                }
                else if (ms > secondDelay[0] && ms < secondDelay[1]) {
                  x = (resultIndex_2 * multiply_to_ideal / pubgFactor) * pubgScopeFactor / pubgSittingFactor / gripFactor / attachFactor - 1;
                  ms += 10;

                }
                else if (ms > thirdDelay) {
                  x = (resultIndex_3 * multiply_to_ideal / pubgFactor) * pubgScopeFactor / pubgSittingFactor / gripFactor / attachFactor - 1;
                  ms += 10;
                }
                ostatokXneg += 1;
              } else {
                if (ms < firstDelay) {
                  x = (resultIndex_1 * multiply_to_ideal / pubgFactor) * pubgScopeFactor / pubgSittingFactor / gripFactor / attachFactor;
                  ms += 10;

                }
                else if (ms > secondDelay[0] && ms < secondDelay[1]) {
                  x = (resultIndex_2 * multiply_to_ideal / pubgFactor) * pubgScopeFactor / pubgSittingFactor / gripFactor / attachFactor;
                  ms += 10;

                }
                else if (ms > thirdDelay) {
                  x = (resultIndex_3 * multiply_to_ideal / pubgFactor) * pubgScopeFactor / pubgSittingFactor / gripFactor / attachFactor;
                  ms += 10;
                }
              }
              if (Number.isInteger(x) == false) {
                if (x > 0) {
                  const resultX = x.toString().split('.')[1]
                  // console.log(Number("0." + resultX))
                  ostatokX += Number("0." + resultX);
                  console.log(ostatokX)
                } else {
                  const resultX = x.toString().split('.')[1]
                  // console.log(Number("0." + resultX))
                  ostatokXneg += Number("-0." + resultX);
                  console.log(ostatokXneg)
                }
              }


              let shiftkey = JSON.parse(localStorage.getItem('defaultKeys')).pubgShift;
              if (keyPressed.includes(shiftkey)) {
                user32.mouse_event(1, 0, x * 1.3, 0, 0);
              } else {
                user32.mouse_event(1, 0, x, 0, 0);
              }

              count += 1;










            }
          }, intervalMs);
        }
      };
    });
  };

  let pubgSittingFactor = 1;
  //SCOPES FACTOR
  let pubgScopeFactor = 1;


  //FREEZE OPACITY
  let freezeOpacity = 10;
  let freezeOpacityP = 10;
  let freezeOpacityrangeP = document.querySelector('.freezeOpacity p');
  var freezeOpacityinputRange = document.querySelector('.range.freezeOpacityRange');

  if (localStorage.getItem('freezeOpacity') !== null) {
    freezeOpacityinputRange.value = JSON.parse(localStorage.getItem('freezeOpacity')).value;
    freezeOpacityrangeP.innerText = JSON.parse(localStorage.getItem('freezeOpacity')).value;
    freezeOpacity = JSON.parse(localStorage.getItem('freezeOpacity')).value;
  };

  freezeOpacityinputRange.addEventListener('input', function () {
    if (freezeOpacityinputRange.value == 10) { freezeOpacity = 10; freezeOpacityP = 10 } else { freezeOpacity = freezeOpacityinputRange.value; freezeOpacityP = freezeOpacityinputRange.value };
    freezeOpacityrangeP.innerText = freezeOpacityP;
    localStorage.setItem('freezeOpacity', JSON.stringify({ value: this.value }));
    ipcRenderer.send('updateFreezeOpacity', freezeOpacity);


    if (this.value > 2) { inputRange.classList.add('ltpurple') }
    if (this.value > 3) { inputRange.classList.add('purple') }
    if (this.value > 4) { inputRange.classList.add('pink') }
    if (this.value < 2) { inputRange.classList.remove('ltpurple') }
    if (this.value < 3) { inputRange.classList.remove('purple') }
    if (this.value < 4) { inputRange.classList.remove('pink') }
  });
  // // SENSETIVE
  // let pubgSensetive = 50;
  // let pubgFactor = 1;

  // let rangeP = document.querySelector('.sensetive p');
  // var inputRange = document.getElementsByClassName('range')[0],

  // maxValue = 50;
  // inputRange.min = 1;
  // inputRange.max = maxValue;
  // inputRange.value = 50;

  // if (localStorage.getItem('pubgSensetive') !== null) {
  //     inputRange.value = JSON.parse(localStorage.getItem('pubgSensetive')).value;
  //     rangeP.innerText = JSON.parse(localStorage.getItem('pubgSensetive')).sensetive;
  //     pubgFactor = JSON.parse(localStorage.getItem('pubgSensetive')).factor;
  // };

  // inputRange.addEventListener('input', function() {
  //     // switch(true) {
  //     //     case this.value == 2: pubgSensetive = 25; pubgFactor = 3.2; break;
  //     //     case this.value == 3: pubgSensetive = 30; pubgFactor = 2.49; break;
  //     //     case this.value == 4: pubgSensetive = 35; pubgFactor = 1.9; break;
  //     //     case this.value == 5: pubgSensetive = 40; pubgFactor = 1.5; break;
  //     //     case this.value == 6: pubgSensetive = 45; pubgFactor = 1.28; break;
  //     //     case this.value == 7: pubgSensetive = 50; pubgFactor = 1; break;
  //     // }

  //     pubgFactor = (50 / this.value);
  //     pubgSensetive = this.value;
  //     console.log(pubgFactor)

  //     rangeP.innerText = pubgSensetive;

  //     localStorage.setItem('pubgSensetive', JSON.stringify({value: this.value, sensetive: pubgSensetive, factor: pubgFactor}));



  //     if (this.value > 2) {
  //         inputRange.classList.add('ltpurple');
  //     }
  //     if (this.value > 3) {
  //         inputRange.classList.add('purple');
  //     }
  //     if (this.value > 6) {
  //         inputRange.classList.add('pink');
  //     }

  //     if (this.value < 1) {
  //         inputRange.classList.remove('ltpurple');
  //     }
  //     if (this.value < 3) {
  //         inputRange.classList.remove('purple');
  //     }
  //     if (this.value < 6) {
  //         inputRange.classList.remove('pink');
  //     }
  // });





  // orig sens 50
  // SENSETIVE
  let pubgSensetive = 1;
  let pubgFactor = 1;

  let rangeP = document.querySelector('.sensetive p');
  var inputRange = document.getElementsByClassName('range')[0],

    maxValue = 100;
  inputRange.min = 1;
  inputRange.max = maxValue;
  inputRange.value = 1;

  if (localStorage.getItem('pubgSensetive') !== null) {
    inputRange.value = JSON.parse(localStorage.getItem('pubgSensetive')).value;
    rangeP.innerText = JSON.parse(localStorage.getItem('pubgSensetive')).sensetive;
    pubgFactor = JSON.parse(localStorage.getItem('pubgSensetive')).factor;
  };

  inputRange.addEventListener('input', function () {
    pubgSensetive = this.value;
    // 1.0456396
    // 1.2055
    pubgFactor = 1.2055 * Math.pow(1.048, this.value - 1)
    rangeP.innerText = pubgSensetive;

    localStorage.setItem('pubgSensetive', JSON.stringify({ value: this.value, sensetive: pubgSensetive, factor: pubgFactor }));



    if (this.value > 2) {
      inputRange.classList.add('ltpurple');
    }
    if (this.value > 3) {
      inputRange.classList.add('purple');
    }
    if (this.value > 6) {
      inputRange.classList.add('pink');
    }

    if (this.value < 1) {
      inputRange.classList.remove('ltpurple');
    }
    if (this.value < 3) {
      inputRange.classList.remove('purple');
    }
    if (this.value < 6) {
      inputRange.classList.remove('pink');
    }
  });
  // SCOPES
  // let scopeItems = document.querySelectorAll('.scope .ex');
  // scopeItems.forEach((el) => {
  //     el.addEventListener('click', function() {
  //         scopeItems.forEach((x) => {
  //             x.classList.remove('active');
  //         });
  //         this.classList.add('active');
  //         pubgScopeFactor = +this.getAttribute('factor');
  //         ipcRenderer.send('clickScope', {id: this.id});
  //     });
  // });



  // // TEST FACTOR
  // let testFactorInput = document.querySelector('.testFactor input');
  // if (testFactorInput) {
  //     testFactorInput.addEventListener('change', function() {
  //         pubgFactor = testFactorInput.value;
  //     });
  // }

  // // scope factor test
  // let testScopeFactorInput = document.querySelector('.testFactorScope input');
  // if (testScopeFactorInput) {
  //     testScopeFactorInput.addEventListener('change', function() {
  //         pubgSittingFactor = testScopeFactorInput.value;
  //     });
  // }

  // // scope method test
  // let scopeTestMethods = document.querySelectorAll('.testScopeMethod input');
  // if (scopeTestMethods) {
  //     scopeTestMethods.forEach(function(el) {
  //         el.addEventListener('click', function() {
  //             if (this.id == 'multiply') {
  //                 pubgScopeMethod = 'multiply';
  //             }
  //             if (this.id == 'split') {
  //                 pubgScopeMethod = 'split';
  //             }
  //         });
  //     });
  // }


  // 1 className 2 intervalMs 3 4 5 indexRecoil 6 7 8 delayIf 9 10 массивы по 2 элемента в прицелы

  weaponTehnics('mp5k', 20, 5, 9, null, 180, null, null, null, null);
  weaponTehnics('m416', 10, 3, 5, null, 650, null, null, [1, 1], [1, 2]);
  weaponTehnics('ace32', 10, 4, 6, null, 700, null, null, [1, 1], [1, 2]);
  weaponTehnics('ak-47', 10, 3, 5, null, 550, null, null, [1, 1], [1, 2]);
  weaponTehnics('tompson', 10, 3, 5, null, 650, null, null, null, null);
  weaponTehnics('ump', 20, 4, 7, null, 230, null, null, [1, 1], [1, 2]);
  weaponTehnics('bizon', 40, 8, 10, null, 40, null, null, [1, 1], [1, 2]);
  weaponTehnics('mp9', 40, 8, 12, 7, 100, [80, 230], 210, [1, 1, 1], [1, 2, 2]);
  weaponTehnics('p90', 40, 8, 12, 7, 100, [80, 230], 210, [1, 1, 1], [1, 2, 2]);
  weaponTehnics('uzi', 10, 3, 6, null, 500, null, null, null, null);
  weaponTehnics('scar', 10, 2, 4, 5, 460, [450, 1600], 1570, [1, 1, 2], [1, 2, 3]);
  weaponTehnics('g36', 10, 3, 5, 6, 700, [680, 2100], 2070, [1, 1, 2], [1, 2, 2]);
  weaponTehnics('vector', 10, 3, 6, null, 500, null, null, [1, 1], [1, 2]);
  weaponTehnics('qbz', 10, 2, 4, 5, 450, [440, 1250], 1230, [1, 1, 1], [1, 2, 2]);
  // weaponTehnics('mg3', 40, 4, 12, null, 140, null, null, [1, 2], [1, 3]);
  weaponTehnics('aug', 20, 5, 11, null, 230, null, null, [1, 1], [1, 2]);
  weaponTehnics('beryl', 20, 9, 14, null, 380, null, null, [2, 3], [2, 4]);
  weaponTehnics('groza', 10, 3, 4, 5, 450, [440, 1250], 1230, [1, 1, 1], [1, 2, 2]);
  // weaponTehnics('m249', 40, 12, 17, 11, 650, [610, 1000], 960, [1, 1, 2], [1, 2, 4]);
  weaponTehnics('vss', 10, 4, 9, 10, 300, [290, 820], 810, null, null);
  // weaponTehnics('dp', 10, 3, 5, 6, 710, [700, 2500], 2450, [1, 1, 2], [1, 2, 3]);
  weaponTehnics('k2', 10, 3, 4, 5, 450, [440, 1250], 1230, [1, 1, 1], [1, 2, 2]);
  weaponTehnics('O12', 10, 4, 4, null, 500, null, null, null, null);
  // weaponTehnics('famas', 20, 7, 17, null, 550, null, null, [1, 1], [1, 2]);
  // 20 ms // sens 1
  let famasArr = [[0, 50], [0, 50], [0, 50], [0, 50], [0, 50], [0, 50], [0, 50], [0, 50], [0, 50], [0, 50], [0, 50], [0, 50], [0, 50], [0, 50], [0, 50], [0, 50], [0, 50], [0, 50], [0, 50], [0, 50], [0, 50], [0, 50], [0, 50], [0, 50], [0, 50], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100], [0, 100]]
  wt('famas', famasArr)
  let m249Arr = [[0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 85], [0, 85], [0, 85], [0, 85], [0, 85], [0, 85], [0, 85], [0, 85], [0, 85], [0, 85], [0, 85], [0, 85], [0, 85], [0, 85], [0, 85], [0, 85], [0, 85], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42]]
  wt('m249', m249Arr)
  let dpArr = [[0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 44], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 80], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95], [0, 95]]
  wt('dp', dpArr)
  let mg3Arr = [[0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 22], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45], [0, 45]]
  wt('mg3', mg3Arr)
  weaponTehnicsSingle('m16a4', 10, 2, 4, 300, 260, [1, 1], [1, 2]);
  weaponTehnicsSingle('m16a4_1', 24, 4, null, null, 60, [1], [1]);
  weaponTehnicsSingle('mutant', 24, 4, null, null, 60, [1], [1]);
  weaponTehnicsSingle('mini', 10, 3, 6, 400, 50, [1, 2], [1, 3]);
  weaponTehnicsSingle('qbu', 10, 3, 6, 400, 50, [1, 2], [1, 3]);
  weaponTehnicsSingle('mk', 10, 4, 7, 600, 50, [1, 2], [1, 3]);
  weaponTehnics('mka', 10, 4, 8, 9, 300, [290, 820], 810, [1, 1, 2], [1, 2, 3]);
  weaponTehnicsSingle('mk12', 10, 5, 7, 600, 50, [1, 2], [1, 3]);
  weaponTehnicsSingle('sks', 10, 4, 7, 360, 50, [1, 1], [1, 2]);
  weaponTehnicsSingle('slr', 10, 4, 7, 360, 50, [1, 1], [1, 2]);

  // } catch (e) {
  //     alert(e);
  // }



}
