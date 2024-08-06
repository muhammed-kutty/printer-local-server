import { app, BrowserWindow } from 'electron';
import express from 'express';
import bodyParser from 'body-parser';
import { ThermalPrinter, PrinterTypes } from 'node-thermal-printer';
import cors from 'cors';
import ngrok from 'ngrok'
import { exec } from 'child_process';


function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    });

    win.loadFile('index.html');
}

  // Start Localtunnel

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// Function to start LocalTunnel
function startLocalTunnel(port) {
    const localTunnelCommand = `lt --port ${port} --subdomain yoursubdomain`; // Replace 'yoursubdomain' with your desired subdomain

    const tunnelProcess = exec(localTunnelCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error starting LocalTunnel: ${error}`);
            return;
        }
        console.log(`LocalTunnel stdout: ${stdout}`);
        console.error(`LocalTunnel stderr: ${stderr}`);
    });

    tunnelProcess.stdout.on('data', (data) => {
        console.log(`LocalTunnel: ${data}`);
    });

    tunnelProcess.stderr.on('data', (data) => {
        console.error(`LocalTunnel error: ${data}`);
    });
}


// Set up the local print server with Express
const serverApp = express();
const port = 4000;

serverApp.use(cors());
serverApp.use(bodyParser.json());



serverApp.post('/print', async (req, res) => {

    console.log("api called")
    let printer = new ThermalPrinter({
        type: PrinterTypes.EPSON,
        interface: '/dev/usb/lp0', // Adjust this to your printer's interface
        // interface:'tcp://192.168.123.100'
    });

    const isConnected = await printer.isPrinterConnected();
    console.log("Printer connected:", isConnected);

    if (!isConnected) {
        return res.status(500).send("Printer is not connected.");
    }

    printer.alignCenter();
    printer.println("Test print line 1");
    printer.println("Test print line 2");
    printer.println("Test print line 1");
    printer.println("Test print line 2"); 
    printer.println("Test print line 1");
    printer.println("Test print line 2"); 
    printer.println("Test print line 1");
    printer.println("Test print line 2"); 
    printer.println("Test print line 1");
    printer.println("Test print line 2"); 
    printer.println("Test print line 1");
    printer.println("Test print line 2"); 
    printer.println("Test print line 1");
    printer.println("Test print line 2"); 
    printer.drawLine('#')
    printer.println("Test print line 1");
    printer.println("Test print line 2"); 
    printer.println("Test print line 1");
    printer.println("Test print line 2"); 
    printer.println("Test print line 1");
    printer.println("Test print line 2"); 
    printer.println("Test print line 1");
    printer.println("Test print line 2"); 
    printer.println("Test print line 1");
    printer.println("Test print line 2"); 

    printer.cut();
    printer.beep();

    try {
        await printer.execute();
        res.send('Printed successfully');
    } catch (error) {
        console.error('Print failed', error);
        res.status(500).send('Error printing');
    }
});


serverApp.listen(port, () => {
    console.log(`Local print server running on port ${port}`);
    
    // Start LocalTunnel after the server starts
    startLocalTunnel(port);
});



// async function startServer() {
//     try {
//         // Start HTTPS server (uncomment if using HTTPS)
//         // const httpsServer = https.createServer(options, serverApp);

//         // Start Express server on the specified port
//         serverApp.listen(port, () => {
//             console.log(`Local print server running on port ${port}`);

//             // Start Ngrok tunnel
//             // ngrok.connect({
//             //     proto: 'http', // http|tcp|tls
//             //     addr: 4000,    // Port or network address to forward from
//             //     region: 'us',  // One of ngrok regions (us, eu, au, ap), defaults to us
//             // }).then(url => {
//             //     console.log(`Ngrok tunnel URL: ${url}`);

//             //     // Optionally, load your Electron app with the Ngrok URL
//             //     // mainWindow.loadURL(url);
//             // }).catch(error => {
//             //     console.error('Error starting Ngrok:', error);
//             // });
//         });
//     } catch (error) {
//         console.error('Error starting server:', error);
//     }
// }

// Call function to start the server and Ngrok tunnel
// startServer();


// function startLocaltunnel() {
//     const ngrokConfigPath = '/home/muhammed/ngrok.yml'; // Example: '/home/yourusername/ngrok.yml'
  
//     const ngrokCommand = `ngrok start --config=${ngrokConfigPath} myapp`;
  
//     const ngrokProcess = exec(ngrokCommand, (error, stdout, stderr) => {
//         if (error) {
//           console.error(`Error starting Ngrok: ${error}`);
//           return;
//         }
//         console.log(`Ngrok stdout: ${stdout}`);
//         console.error(`Ngrok stderr: ${stderr}`);
//       });
    
//       ngrokProcess.stdout.on('data', (data) => {
//         console.log(`Ngrok: ${data}`);
//       });
    
//       ngrokProcess.stderr.on('data', (data) => {
//         console.error(`Ngrok error: ${data}`);
//       });
//   }