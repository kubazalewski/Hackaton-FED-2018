const $boxes = document.querySelectorAll('.news-boxes > .box')
fetch('http://kitan.pl/pb/data/news.json')
    .then(response => response.json())
    .then(response => {
        $boxes.forEach(($box, index) => {
            const data = response[index]
            addDataToNewsBox($box, data)
        })
    })

function addDataToNewsBox($box, data) {
    const {
        title,
        description,
        author,
        image,
        date_timestamp
    } = data
    $box.querySelector('.box__header').innerText = title
    $box.querySelector('.box__text').innerText = trimDescription(description)
    $box.querySelector('.author').innerText = `Author: ${author}`
    $box.querySelector('.box__img').src = image.x1
    const date = new Date(Number(date_timestamp))
    const day = date.getDate()
    const month = parseMonths(date.getMonth())
    const year = date.getFullYear()
    $box.querySelector('.date').innerText = `${day} ${month} ${year}`
}

function parseMonths (monthIndex) {
    const months = [
        'Jan', 
        'Feb', 
        'Mar', 
        'Apr', 
        'May', 
        'Jun', 
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dev'
    ]
    return months[monthIndex]
}

function trimDescription (description) {
    return description.substr(0, 200)
}
