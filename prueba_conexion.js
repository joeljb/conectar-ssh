var Client = require('ssh2').Client;
module.exports={
	conexion: async function(config){
		var tiempo = 10000
		return new Promise((f,r)=>{
				var _this = this
				this.conexion =  new Client()
				this.conexion.connect({
		        host: "host",
		        username: "username",
		        port: '22',
		        password: "password",
		        algorithms: {
		            kex: [
		                'diffie-hellman-group1-sha1',
		                'diffie-hellman-group-exchange-sha1',
		                'diffie-hellman-group14-sha1',
		                'diffie-hellman-group-exchange-sha256',
		                'ecdh-sha2-nistp521',
		                'ecdh-sha2-nistp384',
		                'ecdh-sha2-nistp256'
		            ],
		            cipher: [
		                'aes128-ctr',
		                'aes192-ctr',
		                'aes256-ctr',
		                'aes128-gcm',
		                'aes128-gcm@openssh.com',
		                'aes256-gcm',
		                'aes256-gcm@openssh.com',
		                'aes256-cbc',
		                'aes192-cbc',
		                'aes128-cbc',
		                'blowfish-cbc',
		                '3des-cbc',
		                'arcfour256',
		                'arcfour128',
		                'cast128-cbc',
		                'arcfour'
		            ]
		        }
		    }); 
			this.conexion.on('timedout', function(e) {
				var err = utils.crearError('CON02', ' TIEMPO DE ESPERA EXCEDIDO', e);
				r(err)
			});

			this.conexion.on('ready', async function() {
				_this.conexion.shell(async function(err, stream) {
        	if (err)  r(err);
        		await stream.on('close', function() {
          		_this.conexion.end();
        	})
        	f(stream)
        });		
			})
		})
	},
	comando: function (stream,comando) {
		var response = '',cant=1,self=this;
		var tiempoResp = 5000
		return new Promise((f,r)=>{
			this.dateStart = new Date()
			var handler =  function(data){
	      response += ''+data;
	      console.log(response)
	     	return f(response);
			}
	  	stream.on('data', handler)
	  	stream.stderr.on('data', function(data) {
	    	console.log('STDERR: ' + data);
	    });
	    stream.write(comando);   //habilitas 
	      var tiempo = setTimeout(function() {
	    	r("error de tiempo de ejecucion  ",response)
			}, 30000);
		})
	}
}