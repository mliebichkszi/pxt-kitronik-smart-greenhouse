input.onButtonPressed(Button.A, function () {
    basic.showNumber(kitronik_smart_greenhouse.temperature(TemperatureUnitList.C))
    basic.showNumber(kitronik_smart_greenhouse.humidity())
    basic.showNumber(kitronik_smart_greenhouse.readIOPin(kitronik_smart_greenhouse.PinType.analog, kitronik_smart_greenhouse.IOPins.p1))
})
input.onButtonPressed(Button.AB, function () {
    if (farbe == 5) {
        farbe = 0
    } else {
        farbe += 1
    }
})
let bodenfeuchtigkeit = 0
let luftfeuchtigkeit = 0
let temperatur = 0
let farbe = 0
kitronik_smart_greenhouse.setBuzzerPin()
let zipLEDs2 = kitronik_smart_greenhouse.createGreenhouseZIPDisplay(8)
let zipStick = zipLEDs2.zipStickRange()
let zipLEDs = kitronik_smart_greenhouse.createGreenhouseZIPDisplay(3)
let statusLEDs = zipLEDs.statusLedsRange()
farbe = 0
basic.forever(function () {
    temperatur = Math.map(kitronik_smart_greenhouse.temperature(TemperatureUnitList.C), 0, 40, 210, 0)
    luftfeuchtigkeit = Math.map(kitronik_smart_greenhouse.humidity(), 0, 100, 35, 150)
    bodenfeuchtigkeit = Math.map(kitronik_smart_greenhouse.readIOPin(kitronik_smart_greenhouse.PinType.analog, kitronik_smart_greenhouse.IOPins.p1), 0, 1023, 35, 500)
    statusLEDs.setZipLedColor(0, kitronik_smart_greenhouse.hueToRGB(temperatur))
    statusLEDs.setZipLedColor(1, kitronik_smart_greenhouse.hueToRGB(luftfeuchtigkeit))
    statusLEDs.setZipLedColor(2, kitronik_smart_greenhouse.hueToRGB(bodenfeuchtigkeit))
    statusLEDs.show()
    if (kitronik_smart_greenhouse.readIOPin(kitronik_smart_greenhouse.PinType.analog, kitronik_smart_greenhouse.IOPins.p1) <= 50) {
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . . . . .
            . . # . .
            `)
        music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Forever)
        basic.pause(2000)
        music.stopMelody(MelodyStopOptions.All)
        for (let index = 0; index < 1; index++) {
            kitronik_smart_greenhouse.controlHighPowerPin(kitronik_smart_greenhouse.HighPowerPins.pin13, kitronik_smart_greenhouse.onOff(true))
            basic.pause(100)
            kitronik_smart_greenhouse.controlHighPowerPin(kitronik_smart_greenhouse.HighPowerPins.pin13, kitronik_smart_greenhouse.onOff(false))
            basic.pause(2000)
        }
    } else {
        basic.showLeds(`
            . . . . .
            . . . . #
            . . . # .
            # . # . .
            . # . . .
            `)
    }
    basic.pause(50000)
})
basic.forever(function () {
    if (farbe == 0) {
        zipStick.showColor(kitronik_smart_greenhouse.colors(ZipLedColors.White))
    } else if (farbe == 1) {
        zipStick.showColor(kitronik_smart_greenhouse.colors(ZipLedColors.Red))
    } else if (farbe == 2) {
        zipStick.showColor(kitronik_smart_greenhouse.colors(ZipLedColors.Green))
    } else if (farbe == 3) {
        zipStick.showColor(kitronik_smart_greenhouse.colors(ZipLedColors.Blue))
    } else if (farbe == 4) {
        zipStick.showColor(kitronik_smart_greenhouse.rgb(220, 75, 200))
    } else if (farbe == 5) {
        zipLEDs.clear()
        zipLEDs.show()
    }
})
