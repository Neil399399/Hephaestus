package httpclient

type ErrCode int
type CodeMsg struct {
	code int
	msg  string
}

// error code
const (
	SUCCESS ErrCode = iota
	ERROR
	INVALID_PARAMS
	INVALID_TOKEN
	TOKEN_EXPIRED
)

var success = CodeMsg{code: 200, msg: "ok"}

var errors = map[ErrCode]CodeMsg{
	ERROR:          {code: 400, msg: "failed"},
	INVALID_PARAMS: {code: 500, msg: "invalid paramters"},
	INVALID_TOKEN:  {code: 10001, msg: "invalid token"},
	TOKEN_EXPIRED:  {code: 10002, msg: "token expired"},
}

func GetError(code ErrCode) CodeMsg {
	msg, ok := errors[code]
	if ok {
		return msg
	}
	return errors[ERROR]
}
