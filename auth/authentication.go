package auth

type Session struct {
	DisplayName string
	Password    string
}

func (s Session) checkAuth() bool {
	return false
}
