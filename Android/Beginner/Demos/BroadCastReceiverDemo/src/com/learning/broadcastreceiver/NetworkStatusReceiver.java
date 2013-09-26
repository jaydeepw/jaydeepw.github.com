package com.learning.broadcastreceiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.util.Log;

public class NetworkStatusReceiver extends BroadcastReceiver {

	private static final String TAG = "NetworkStatusReceiver";
	
	@Override
	public void onReceive(Context context, Intent intent) {
		
		if(intent.getExtras() != null){
	        NetworkInfo netInfo=(NetworkInfo) intent.getExtras().get(ConnectivityManager.EXTRA_NETWORK_INFO);
	        
	        Intent uiUpdateIntent = new Intent("com.learning.intent.uiUpdate");
	        
	        if( netInfo!=null && netInfo.getState() == NetworkInfo.State.CONNECTED ){
	        	//Log.i(TAG,"Network "+ netInfo.getTypeName()+" connected");
	        	Log.i(TAG, "Network CONNECTED.");
	        	uiUpdateIntent.putExtra("networkState", 1);
	        }
	            
	        else{
	        	//Log.i(TAG,"Network "+ netInfo.getTypeName()+" disconnected");
	        	Log.i(TAG, "Network DISCONNECTED.");
	        	uiUpdateIntent.putExtra("networkState", 0);	
	        }
	        
	        
	        context.sendBroadcast(uiUpdateIntent);
		}
	}

}
