/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

package com.facebook.react.modules.focus;

import android.content.Intent;

import androidx.annotation.Nullable;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.facebook.fbreact.specs.NativeLogBoxSpec;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.common.SurfaceDelegate;
import com.facebook.react.devsupport.interfaces.DevSupportManager;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

@ReactModule(name = FocusModule.NAME)
public class FocusModule extends ReactContextBaseJavaModule {
  public static final String NAME = "FocusModule";

  public static final String ON_CHANGE = "FocusModule.change";

  public static boolean enabled = true;
  public static boolean alignCheck = false;
  public static boolean useParentDimension = false;
  public static boolean focusSearchReturnsParentFocusGuide = true;

  public static boolean log = false;
  public static boolean visualDebugger = false;

  /**
   */
  public FocusModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void setDebugger(boolean enabled) {
    FocusModule.visualDebugger = enabled;
    LocalBroadcastManager.getInstance(getReactApplicationContext()).sendBroadcast(new Intent(ON_CHANGE));
  }

  @ReactMethod
  public void setEnabled(boolean enabled) {
    FocusModule.enabled = enabled;
    LocalBroadcastManager.getInstance(getReactApplicationContext()).sendBroadcast(new Intent(ON_CHANGE));
  }

  @ReactMethod
  public void setAlignmentCheck(boolean enabled) {
    FocusModule.alignCheck = enabled;
  }

  @ReactMethod
  public void setUseParentDimension(boolean enabled) {
    FocusModule.useParentDimension = enabled;
  }

  @ReactMethod
  public void setFocusSearchReturnsParentFocusGuide(boolean enabled) {
    FocusModule.focusSearchReturnsParentFocusGuide = enabled;
  }

  @ReactMethod
  public void setLog(boolean enabled) {
    FocusModule.log = enabled;
  }
}
