package com.learning.broadcastreceiver;

import android.os.Bundle;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.TextView;
import android.support.v4.app.NavUtils;

public class MainActivity extends Activity {
	
	private static final String TAG = "MainActivity";

	BroadcastReceiver mUIIntentReceiver;
	
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        
        intiUIIntentReceiver();
        
        registerReceiver(mUIIntentReceiver, new IntentFilter("com.learning.intent.uiUpdate"));
    }

	private void intiUIIntentReceiver() {
		mUIIntentReceiver = new BroadcastReceiver() {
			 
			@Override
			public void onReceive(Context context, Intent intent) {
				Log.i(TAG, "UIIntentReceiver: ");
				int networkState = intent.getIntExtra("networkState", -1);

				TextView networkStatusInUI = (TextView) findViewById(R.id.network_state);
				
				if( networkStatusInUI != null ){
					
					if(networkState == -1)
						Log.e(TAG, "Network status not received.");
					
					if(networkState == 1 )
						networkStatusInUI.setText("CONNECTED");
					else
						networkStatusInUI.setText("DISCONNECTED");
				}
				else
					Log.e(TAG, "TextView is null");
					
			}
		};
	}
	
	@Override
	protected void onPause() {
		super.onPause();
		
		if( mUIIntentReceiver != null )
			unregisterReceiver(mUIIntentReceiver);
	}
    
}
