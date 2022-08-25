import './index.css'

const Profile = props => {
  const {profileDetails} = props
  const {profileImageUrl, name, shortBio} = profileDetails
  return (
    <div className="Profile-bgContainer">
      <img src={profileImageUrl} alt="profile" className="Profile-dp" />
      <h1 className="Profile-nameStyle">{name}</h1>
      <p className="Profile-short-bio">{shortBio}</p>
    </div>
  )
}
export default Profile
