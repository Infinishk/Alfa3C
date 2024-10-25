/* global Cleave */

function formatNumberCommas(id) {
        new Cleave(`#${id}`, {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand'
    });
}

export { formatNumberCommas};