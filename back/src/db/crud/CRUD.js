class CRUD {
    constructor(Model) {
        this.Model = Model
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
    list(config, params = {}) {
        return new Promise((resolve, reject) => {
            const query = this.Model.find(config)
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
