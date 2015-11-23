function SettingsManager(game) {
    this.game = game;

    this.change_size = false;

    this.size = (function () {
        var pairs = DEFAULT_NUM_PAIRS;

        return {
            set: function (value) {
                pairs = value;
            },
            get: function () {
                return pairs;
            }
        };
    })();

    this.temp_size = (function () {
        var pairs = DEFAULT_NUM_PAIRS;

        return {
            set: function (value) {
                pairs = value;
            },
            get: function() {
                return pairs;
            }
        };
    })();

    this.init();
};

SettingsManager.prototype.init = function()
{
    var self = this;
    // Event-handlers
    $('#radio-btns-size').on('change', 'input[type=radio]', function()
    {
        self.temp_size.set(parseInt($(this).attr('value')));
        $('#button-close-and-set').text('Confirm and Restart');
    });

    $('#button-close-and-set').on('click', function()
    {
        if ($(this).text() != 'Close')
            self.change_size = true;
    });

    // When modal pops up
    $('#settings-modal').on('show.bs.modal', function()
    {
        $('#button-close-and-set').text('Close');
        self.change_size = false;
    });

    // When modal closes
    $('#settings-modal').on('hide.bs.modal', function()
    {
        if (self.change_size)
        {
            self.changeSizePermanent(self.temp_size.get());
        }
        else
        {
            // Changing back the radio buttons on 'cancel'
            $('#radio-btns-size>input[type=radio][value=' + self.temp_size.get() + ']')[0].checked = false;
            $('#radio-btns-size>input[type=radio][value=' + self.size.get() + ']')[0].checked = true;
        }
    });
};

SettingsManager.prototype.changeSizePermanent = function(new_size)
{
    this.size.set(this.temp_size.get());
    this.game.resetGame();
};
