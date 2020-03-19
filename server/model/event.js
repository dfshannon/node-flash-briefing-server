
import connection from '../util/database';

export function getEvent(id) {
    const result = connection.query(`select * from event where id = '${id}';`);
    return result;
}

export function getEvents() {
    const result = connection.query('select * from event;');
    return result;
}

// 'yyyy-mm-dd'
export function getEventsForDate(date) {
    const result = connection.query(`select * from event where updateDate = '${date}';`);
    return result;
}

export async function addEvent(uid, updateDate, titleText, mainText, redirectionUrl) {
    const data = {
        uid,
        updateDate,
        titleText,
        mainText,
        redirectionUrl
    };
    const result = await connection.query('INSERT INTO event SET ?', data);
    return result.affectedRows === 1;
}

export async function updateEvent(id, existing, updateDate, titleText, mainText, redirectionUrl) {
    let data = { ...existing};
    if (updateDate) {
        data.updateDate = updateDate;
    }
    if (titleText) {
        data.titleText = titleText;
    }
    if (mainText) {
        data.mainText = mainText;
    }
    if (redirectionUrl) {
        data.redirectionUrl = redirectionUrl;
    }
    const result = await connection.query(`update event SET ? where id = '${id}';`, data);
    return result.affectedRows === 1;
}

export async function deleteEvent(id) {
    const result = await connection.query('delete from event where id = ?', [id]);
    return result.affectedRows === 1;
}
