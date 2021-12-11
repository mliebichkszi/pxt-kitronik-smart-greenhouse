def on_button_pressed_a():
    basic.show_number(kitronik_smart_greenhouse.temperature(TemperatureUnitList.C))
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    basic.show_number(kitronik_smart_greenhouse.read_io_pin(kitronik_smart_greenhouse.PinType.ANALOG,
            kitronik_smart_greenhouse.IOPins.P1))
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    basic.show_number(kitronik_smart_greenhouse.humidity())
input.on_button_pressed(Button.B, on_button_pressed_b)

bodenfeuchtigkeit = 0
luftfeuchtigkeit = 0
temperatur = 0
zipLEDs = kitronik_smart_greenhouse.create_greenhouse_zip_display(8)
statusLEDs = zipLEDs.status_leds_range()

def on_forever():
    global temperatur, luftfeuchtigkeit, bodenfeuchtigkeit
    temperatur = Math.map(kitronik_smart_greenhouse.temperature(TemperatureUnitList.C),
        0,
        40,
        210,
        0)
    luftfeuchtigkeit = Math.map(kitronik_smart_greenhouse.humidity(), 0, 100, 35, 150)
    bodenfeuchtigkeit = Math.map(kitronik_smart_greenhouse.read_io_pin(kitronik_smart_greenhouse.PinType.ANALOG,
            kitronik_smart_greenhouse.IOPins.P1),
        0,
        1023,
        35,
        150)
    statusLEDs.set_zip_led_color(0, kitronik_smart_greenhouse.hue_to_rgb(temperatur))
    statusLEDs.set_zip_led_color(1, kitronik_smart_greenhouse.hue_to_rgb(luftfeuchtigkeit))
    statusLEDs.set_zip_led_color(2, kitronik_smart_greenhouse.hue_to_rgb(bodenfeuchtigkeit))
    statusLEDs.show()
    if kitronik_smart_greenhouse.read_io_pin(kitronik_smart_greenhouse.PinType.ANALOG,
        kitronik_smart_greenhouse.IOPins.P1) <= 400:
        basic.show_icon(IconNames.SAD)
        music.start_melody(music.built_in_melody(Melodies.BA_DING),
            MelodyOptions.FOREVER)
        basic.pause(100)
        music.stop_melody(MelodyStopOptions.ALL)
        for index in range(3):
            pass
    else:
        basic.show_icon(IconNames.HAPPY)
basic.forever(on_forever)
