import '../../assets/css/account.css'
import '../../assets/css/nav.css'
const Account = () => {
    return (
        <div className="container account col-12 col-lg-9">
            <div className="row">
                <div className="col-sm-6 col-12">
                    <h3>Account</h3>
                    <form>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email Address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                                placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Recovery Email Address</label>
                            <input type="email" className="form-control" id="email-recovery" aria-describedby="emailHelp"
                                placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="Password" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary col-4">Save</button>
                    </form>
                </div>
                <div className="col-sm-6 col-12 re-password">
                    <h3>Reset Password</h3>
                    <form>
                        <div className="form-group">
                            <label for="exampleInputPassword1">New Password</label>
                            <input type="password" className="form-control" id="new-Password" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Confirm Password</label>
                            <input type="password" className="form-control" id="con-Password" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary col-4">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Account;