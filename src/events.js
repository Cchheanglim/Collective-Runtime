// Turns an untrusted request body into a safe agent event, or null if it's junk.
const STATES = ['idle', 'working', 'waiting', 'done', 'gone'];

const clean = (value) => String(value ?? '').replace(/[^\w.-]/g, '').slice(0, 40);

function parseEvent(body) {
  let event;
  try {
    event = JSON.parse(body);
  } catch {
    return null;
  }
  if (!event || !STATES.includes(event.state)) return null;
  const agent = clean(event.agent);
  if (!agent) return null;
  return { agent, session: clean(event.session), state: event.state };
}

module.exports = { parseEvent, STATES };
