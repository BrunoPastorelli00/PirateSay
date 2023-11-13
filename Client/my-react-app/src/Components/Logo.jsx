import logo from '../images/logo.png'

function Logo () {
    // const url = "https://scontent-lhr6-1.xx.fbcdn.net/v/t39.30808-6/398981231_672197328380885_2201275841307407980_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=K8BJXdXH7IQAX9vbGO2&_nc_ht=scontent-lhr6-1.xx&oh=00_AfAhFBo2OWjOkqIUfT0CpFWDJBNX5ZV8abxx4l127G5S5Q&oe=65526780"
    return (
        <div className="logobox">
            <img src={logo} alt="Logo" className="logo"/>
        </div>
    )
}

export default Logo;


