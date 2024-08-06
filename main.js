import { app, BrowserWindow } from 'electron';
import express from 'express';
import bodyParser from 'body-parser';
import { ThermalPrinter, PrinterTypes } from 'node-thermal-printer';
import cors from 'cors';
import io from 'socket.io-client'
import { exec } from 'child_process';
// import {findPrinter} from 'escpos-usb'
import escpos from 'escpos'

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
    const socket = io.connect("https://printrerrr-main.onrender.com")

    socket.on('messageFromServer', (message) => {
        console.log('Message from server:', message);
        // Handle the message received from server here
    });
    socket.on('print', async (message) => {
      console.log('Message from server:', message);
      // Handle the message received from server 
      
              console.log("api called")
         const devices = escpos.Printer("USB001");
        if (devices.length === 0) {
          console.error('No USB printer devices found.');
          process.exit(1);
        }

        // Create the USB device
        const device = new escpos.USB(devices[0].vendorId, devices[0].productId);

          let printer = new ThermalPrinter({
              type: PrinterTypes.EPSON,
              // interface: 'tcp://192.168.123.1', // Adjust this to your printer's interface
              interface: device // Adjust this to your printer's interface
            // options:{              // Additional options
            //     timeout: 10000     // Connection timeout (ms) [applicable only for network printers] - default: 3000
            //   }
          });
      
          const isConnected = await printer.isPrinterConnected();
          console.log("Printer connected:", isConnected);
      
          if (!isConnected) {
            // console.log("printer staus",isConnected)
              return  socket.emit("print_status",{message:"error"})
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
        //   printer.beep();
      
          try {
              const status = await printer.execute();
              if(!status){
                socket.emit("print_status",{message:"error"})
              }
              socket.emit("print_status",{message:"success"})
          } catch (error) {
              console.error('Print failed', error);
              socket.emit("print_status",{message:"error"})

          }
  });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// Function to start LocalTunnel
// function startLocalTunnel(port) {
//     const localTunnelCommand = `lt --port ${port} --subdomain yoursubdomain`; // Replace 'yoursubdomain' with your desired subdomain

//     const tunnelProcess = exec(localTunnelCommand, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Error starting LocalTunnel: ${error}`);
//             return;
//         }
//         console.log(`LocalTunnel stdout: ${stdout}`);
//         console.error(`LocalTunnel stderr: ${stderr}`);
//     });

//     tunnelProcess.stdout.on('data', (data) => {
//         console.log(`LocalTunnel: ${data}`);
//     });

//     tunnelProcess.stderr.on('data', (data) => {
//         console.error(`LocalTunnel error: ${data}`);
//     });
// }


// Set up the local print server with Express
// const serverApp = express();
// const port = 4000;

// serverApp.use(cors());
// serverApp.use(bodyParser.json());





// serverApp.post('/print', async (req, res) => {

//     console.log("api called")
//     let printer = new ThermalPrinter({
//         type: PrinterTypes.EPSON,
//         interface: '/dev/usb/lp0', // Adjust this to your printer's interface
//         // interface:'tcp://192.168.123.100'
//     });

//     const isConnected = await printer.isPrinterConnected();
//     console.log("Printer connected:", isConnected);

//     if (!isConnected) {
//         return res.status(500).send("Printer is not connected.");
//     }

//     printer.alignCenter();
//     printer.println("Test print line 1");
//     printer.println("Test print line 2");
//     printer.println("Test print line 1");
//     printer.println("Test print line 2"); 
//     printer.println("Test print line 1");
//     printer.println("Test print line 2"); 
//     printer.println("Test print line 1");
//     printer.println("Test print line 2"); 
//     printer.println("Test print line 1");
//     printer.println("Test print line 2"); 
//     printer.println("Test print line 1");
//     printer.println("Test print line 2"); 
//     printer.println("Test print line 1");
//     printer.println("Test print line 2"); 
//     printer.drawLine('#')
//     printer.println("Test print line 1");
//     printer.println("Test print line 2"); 
//     printer.println("Test print line 1");
//     printer.println("Test print line 2"); 
//     printer.println("Test print line 1");
//     printer.println("Test print line 2"); 
//     printer.println("Test print line 1");
//     printer.println("Test print line 2"); 
//     printer.println("Test print line 1");
//     printer.println("Test print line 2"); 

//     printer.cut();
//     printer.beep();

//     try {
//         await printer.execute();
//         res.send('Printed successfully');
//     } catch (error) {
//         console.error('Print failed', error);
//         res.status(500).send('Error printing');
//     }
// });


// serverApp.listen(port, () => {
//     console.log(`Local print server running on port ${port}`);
    
    // Start LocalTunnel after the server starts
    // startLocalTunnel(port);
// });



