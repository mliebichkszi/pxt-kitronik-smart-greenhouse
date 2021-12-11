input.onButtonPressed(Button.A, function () {
    basic.showNumber(kitronik_smart_greenhouse.temperature(TemperatureUnitList.C))
})
input.onButtonPressed(Button.AB, function () {
    basic.showNumber(kitronik_smart_greenhouse.readIOPin(kitronik_smart_greenhouse.PinType.analog, kitronik_smart_greenhouse.IOPins.p1))
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(kitronik_smart_greenhouse.humidity())
})
let bodenfeuchtigkeit = 0
let luftfeuchtigkeit = 0
let temperatur = 0
kitronik_smart_greenhouse.setBuzzerPin()
let zipLEDs = kitronik_smart_greenhouse.createGreenhouseZIPDisplay(3)
let statusLEDs = zipLEDs.statusLedsRange()
basic.forever(function () {
    temperatur = Math.map(kitronik_smart_greenhouse.temperature(TemperatureUnitList.C), 0, 40, 210, 0)
    luftfeuchtigkeit = Math.map(kitronik_smart_greenhouse.humidity(), 0, 100, 35, 150)
    bodenfeuchtigkeit = Math.map(kitronik_smart_greenhouse.readIOPin(kitronik_smart_greenhouse.PinType.analog, kitronik_smart_greenhouse.IOPins.p1), 0, 1023, 35, 150)
    statusLEDs.setZipLedColor(0, kitronik_smart_greenhouse.hueToRGB(temperatur))
    statusLEDs.setZipLedColor(1, kitronik_smart_greenhouse.hueToRGB(luftfeuchtigkeit))
    statusLEDs.setZipLedColor(2, kitronik_smart_greenhouse.hueToRGB(bodenfeuchtigkeit))
    statusLEDs.show()
    if (kitronik_smart_greenhouse.readIOPin(kitronik_smart_greenhouse.PinType.analog, kitronik_smart_greenhouse.IOPins.p1) <= 400) {
        basic.showIcon(IconNames.Sad)
        music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Forever)
        basic.pause(2000)
        music.stopMelody(MelodyStopOptions.All)
        for (let index = 0; index < 3; index++) {
            kitronik_smart_greenhouse.controlHighPowerPin(kitronik_smart_greenhouse.HighPowerPins.pin13, kitronik_smart_greenhouse.onOff(true))
            basic.pause(1000)
            kitronik_smart_greenhouse.controlHighPowerPin(kitronik_smart_greenhouse.HighPowerPins.pin13, kitronik_smart_greenhouse.onOff(false))
            basic.pause(2000)
        }
    } else {
        basic.showIcon(IconNames.Happy)
    }
    basic.pause(10000)
})
