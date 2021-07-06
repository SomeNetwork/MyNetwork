class CRUD {
    constructor(Model) {
        this.Model = Model
        // this.defaultLimit = 10
        // TODO: dynamic loading
        this.defaultLimit = 9999
    }

    create(data) {
        return new Promise((resolve, reject) => {
            this.Model.create(data, function (err, user) {
                if (err) {
                    reject(err)
                }
                resolve(user)
            })
        })
    }
    findById(id, params = {}) {
        // return new Promise((resolve, reject) => {
        //     this.Model.findById(id, function (err, user) {
        //         if (err) {
        //             // handleError(err)
        //             reject(err)
        //         }
        //         resolve(user)
        //     })
        // })
        return new Promise((resolve, reject) => {
            const query = this.Model.findById(id)
            const { populate } = params
            if (populate) populate.forEach((p) => query.populate(p))
            query.exec(function (err, res) {
                if (err) {
                    // handleError(err)
                    reject(err)
                }
                resolve(res)
            })
        })
    }
    updateById(id, newDate) {
        return new Promise((resolve, reject) => {
            this.Model.findByIdAndUpdate(id, newDate, function (err, user) {
                if (err) {
                    // handleError(err)
                    reject(err)
                }
                resolve(user)
            })
        })
    }
    deleteById(id) {
        return new Promise()
    }
    deleteMany(cls) {
        return new Promise((resolve, reject) => {
            this.Model.deleteMany(
                { _id: { $in: cls.map((cl) => cl._id) } },
                function (err, res) {
                    if (err) {
                        reject(err)
                    }
                    resolve(res)
                }
            )
        })
    }
    deleteManyById(ids) {
        return new Promise((resolve, reject) => {
            this.Model.deleteMany({ _id: { $in: ids } }, function (err, res) {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    }
    list(config, params = {}) {
        return new Promise((resolve, reject) => {
            const query = this.Model.find(config)
            const { populate, sort, limit } = params
            if (populate) populate.forEach((p) => query.populate(p))
            if (sort) query.sort(sort)
            query.limit(limit || this.defaultLimit)
            query.exec(function (err, res) {
                if (err) {
                    // handleError(err)
                    reject(err)
                }
                resolve(res)
            })
        })
    }
    exists(data) {
        return new Promise((resolve, reject) => {
            this.Model.exists(data, function (err, isExists) {
                if (err) reject(err)
                resolve(isExists)
            })
        })
    }
}

module.exports = CRUD
