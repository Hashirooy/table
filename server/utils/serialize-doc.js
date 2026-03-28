function serializeDoc(doc) {
  if (!doc) return null;
  const o = typeof doc.toObject === "function" ? doc.toObject() : { ...doc };
  const { _id, __v, ...rest } = o;
  return { id: _id != null ? String(_id) : undefined, ...rest };
}

function serializeDocs(docs) {
  return docs.map((d) => serializeDoc(d));
}

function serializeUser(doc) {
  const o = serializeDoc(doc);
  if (o && Object.prototype.hasOwnProperty.call(o, "password")) {
    delete o.password;
  }
  return o;
}

function serializeUsers(docs) {
  return docs.map((d) => serializeUser(d));
}

function serializeTask(doc) {
  const o = serializeDoc(doc);
  if (!o) return null;
  if (Array.isArray(o.assignee)) {
    o.assignee = o.assignee.map((item) => {
      if (item && typeof item === "object" && item._id != null) {
        return serializeUser(item);
      }
      return item;
    });
  }
  return o;
}

function serializeTasks(docs) {
  return docs.map((d) => serializeTask(d));
}

module.exports = {
  serializeDoc,
  serializeDocs,
  serializeUser,
  serializeUsers,
  serializeTask,
  serializeTasks,
};
